import { BuyerRegisterDto } from '@app/auth/dto/buyerRegister.dto';
import {
  SellerCompanyRegisterDto,
  SellerIndividualRegisterDto,
} from '@app/auth/dto/sellerRegister.dto';
import { UserLoginDto } from '@app/auth/dto/userLogin.dto';
import { EmailAlreadyExistsException } from '@app/auth/exceptions/EmailAlreadyExists.exception';
import { PhoneNumberAlreadyExistsException } from '@app/auth/exceptions/PhoneNumberAlreadyExists.exception';
import { ForgotPasswordTokenPayload } from '@app/auth/types/forgotPasswordTokenPayload.interface';
import { JwtPayload } from '@app/auth/types/jwtPayload.type';
import { VerificationTokenPayload } from '@app/auth/types/verificationTokenPayload.interface';
import { BuyerService } from '@app/buyer/buyer.service';
import { Buyer } from '@app/buyer/types/buyer.type';
import { MailService } from '@app/mail/mail.service';
import { SellerService } from '@app/saler/seller.service';
import { CompanySeller, IndividualSeller } from '@app/saler/types/seller.type';
import { UserResponseInterface } from '@app/types/userResponse.interface';
import { User } from '@app/user/types/user.type';
import { UserService } from '@app/user/user.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly buyerService: BuyerService,
    private readonly sellerService: SellerService,
  ) {}

  public async registerBuyer(
    dto: BuyerRegisterDto,
  ): Promise<UserResponseInterface<Buyer>> {
    const { email, phoneNumber } = dto;

    const user = await this.userService.findOne({ email });

    if (user) {
      throw new EmailAlreadyExistsException(email);
    }

    const buyer = await this.buyerService.findOne({ phoneNumber });

    if (buyer) {
      throw new PhoneNumberAlreadyExistsException(phoneNumber);
    }

    const newBuyer = await this.buyerService.create(dto);

    await this.sendVerificationMessage(newBuyer.email);

    return { ...newBuyer, token: this.generateJwt(newBuyer) };
  }

  async login(dto: UserLoginDto): Promise<UserResponseInterface<User>> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordCorrect = await compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    delete user.password;

    return {
      ...user,
      token: this.generateJwt(user),
    } as UserResponseInterface<User>;
  }

  public async registerSellerIndividual(
    dto: SellerIndividualRegisterDto,
  ): Promise<UserResponseInterface<IndividualSeller>> {
    const { email, phoneNumber } = dto;

    const user = await this.userService.findOne({ email });

    if (user) {
      throw new EmailAlreadyExistsException(email);
    }

    const seller = await this.sellerService.findOne({ phoneNumber });

    if (seller) {
      throw new PhoneNumberAlreadyExistsException(phoneNumber);
    }

    const newSeller = await this.sellerService.createIndividual(dto);

    await this.sendVerificationMessage(newSeller.email);

    return { ...newSeller, token: this.generateJwt(newSeller) };
  }

  public async registerSellerCompany(
    dto: SellerCompanyRegisterDto,
  ): Promise<UserResponseInterface<CompanySeller>> {
    const { email, phoneNumber } = dto;

    const user = await this.userService.findOne({ email });

    if (user) {
      throw new EmailAlreadyExistsException(email);
    }

    const seller = await this.sellerService.findOne({ phoneNumber });

    if (seller) {
      throw new PhoneNumberAlreadyExistsException(phoneNumber);
    }

    const newSeller = await this.sellerService.createCompany(dto);

    await this.sendVerificationMessage(newSeller.email);

    return {
      ...newSeller,
      token: this.generateJwt(newSeller),
    };
  }

  private generateJwt(user: JwtPayload): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    return sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtSecret,
    );
  }

  public async sendVerificationMessage(email: string): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_VERIFICATION_EXPIRATION',
    );
    const token = jwt.sign(payload, secret, { expiresIn });

    await this.mailService.sendVerificationLetter({
      to: email,
      data: { token },
    });
  }

  public async verifyEmail(token: string): Promise<void> {
    const email = await this.decodeVerificationToken(token);
    const user = await this.userService.findOne({ email });

    if (user.emailVerified) {
      throw new BadRequestException('Email is already confirmed');
    }

    await this.userService.markEmailVerified(email);
  }

  private async decodeVerificationToken(token: string): Promise<string> {
    try {
      const secret = this.configService.get('JWT_VERIFICATION_SECRET');

      const payload = await jwt.verify(token, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email verification token expired');
      }

      throw new BadRequestException('Bad verification token');
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    const payload: ForgotPasswordTokenPayload = { email };
    const secret = this.configService.get<string>('JWT_RESET_PASSWORD_SECRET');

    const expiresIn = this.configService.get<string>(
      'JWT_RESET_PASSWORD_EXPIRATION',
    );
    const token = jwt.sign(payload, secret, { expiresIn });

    await this.mailService.sendForgotPasswordLetter({
      to: email,
      data: { token },
    });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    const email = await this.decodeResetPasswordToken(token);
    const user = await this.userService.findOne({ email });

    await this.userService.update(user.id, { password });
  }

  private async decodeResetPasswordToken(token: string): Promise<string> {
    try {
      const secret = this.configService.get('JWT_RESET_PASSWORD_SECRET');
      const payload = await jwt.verify(token, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Password reset token has expired');
      }

      throw new BadRequestException('Bad password reset token');
    }
  }
}
