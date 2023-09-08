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
import { BuyerEntity } from '@app/buyer/buyer.entity';
import { BuyerService } from '@app/buyer/buyer.service';
import { MailService } from '@app/mail/mail.service';
import { CompanyEntity } from '@app/saler/entities/company.entity';
import { IndividualEntity } from '@app/saler/entities/individual.entity';
import { SellerService } from '@app/saler/seller.service';
import { UserRole } from '@app/user/enums/userRole.enum';
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
  ): Promise<BuyerEntity & { token: string }> {
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

    await this.sendVerificationMessage(email);

    return {
      ...newBuyer,
      token: this.generateJwt({
        id: newBuyer.id,
        email: newBuyer.user.email,
        role: newBuyer.user.role,
      }),
    };
  }

  async login(dto: UserLoginDto): Promise<
    (BuyerEntity | IndividualEntity | CompanyEntity) & {
      token: string;
      role: string;
    }
  > {
    const { email, password } = dto;

    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid email provided', HttpStatus.BAD_REQUEST);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Invalid password provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { role, id } = user;

    let userData;

    if (role === UserRole.Buyer) {
      userData = await this.buyerService.findOne({ user: { id } });
    } else if (role === UserRole.SellerIndividual) {
      userData = await this.sellerService.findOneIndividual({
        seller: { user: { id } },
      });
    } else if (role === UserRole.SellerCompany) {
      userData = await this.sellerService.findOneCompany({
        seller: { user: { id } },
      });
    }

    if (!userData) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      ...userData,
      token: this.generateJwt(user),
      role,
    };
  }

  public async registerSellerIndividual(
    dto: SellerIndividualRegisterDto,
  ): Promise<IndividualEntity & { token: string }> {
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

    await this.sendVerificationMessage(email);

    return {
      ...newSeller,
      token: this.generateJwt({
        id: newSeller.id,
        email,
        role: newSeller.seller.user.role,
      }),
    };
  }

  public async registerSellerCompany(
    dto: SellerCompanyRegisterDto,
  ): Promise<CompanyEntity & { token: string }> {
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

    await this.sendVerificationMessage(email);

    return {
      ...newSeller,
      token: this.generateJwt({
        id: newSeller.id,
        email,
        role: newSeller.seller.user.role,
      }),
    };
  }

  private generateJwt(user: JwtPayload): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    return jwt.sign(
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
