import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { MailService } from '@app/mail/mail.service';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { Role } from '@app/user/enums/enums';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';
import { Repository } from 'typeorm';

import { UserLoginDto } from './dto/user-login.dto';
import { ForgotPasswordTokenPayload } from './types/forgotPasswordTokenPayload.interface';
import { VerificationTokenPayload } from './types/verificationTokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async createBuyer(createBuyerDto: CreateBuyerDto, imageUrl: string): Promise<BuyerEntity> {
    const user = new UserEntity();
    user.email = createBuyerDto.email;
    user.password = createBuyerDto.password;
    user.role = Role.Buyer;
    const buyer = new BuyerEntity();
    buyer.name = createBuyerDto.name;
    buyer.image = imageUrl
    Object.assign(buyer, createBuyerDto);
    
    const buyerByEmail = await this.userRepository.findOne({
      where: { email: createBuyerDto.email },
    });
    const buyerByPhoneNumber = await this.buyerRepository.findOne({
      where: { phoneNumber: createBuyerDto.phoneNumber },
    });

    if (buyerByEmail || buyerByPhoneNumber) {
      throw new HttpException(
        'Email or Phone is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const savedUser = await this.userRepository.save(user);
    buyer.user = savedUser;
    const savedBuyer = await this.buyerRepository.save(buyer);

    await this.sendVerificationMessage({ email: savedUser.email });

    return savedBuyer;
  }

  async createSeller(createSellerDto: CreateSellerDto, imageUrl: string): Promise<SellerEntity> {
    const user = new UserEntity();
    user.email = createSellerDto.email;
    user.password = createSellerDto.password;
    user.role = Role.Seller;
    const seller = new SellerEntity();
    seller.companyName = createSellerDto.companyName;
    seller.image = imageUrl;
    seller.aboutUs = createSellerDto.aboutUs;
    seller.workingHours = createSellerDto.workingHours;
    Object.assign(seller, createSellerDto);
    const sellerByEmail = await this.userRepository.findOne({
      where: { email: createSellerDto.email },
    });
    const sellerByPhoneNumber = await this.sellerRepository.findOne({
      where: { phoneNumber: createSellerDto.phoneNumber },
    });

    if (sellerByEmail || sellerByPhoneNumber) {
      throw new HttpException(
        'Email or Phone is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const savedUser = await this.userRepository.save(user);
    seller.user = savedUser;
    // delete seller.user.password;
    // delete seller.password;
    const savedSeller = await this.sellerRepository.save(seller);

    await this.sendVerificationMessage({ email: savedUser.email });

    return savedSeller;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  async login(
    userLoginDto: UserLoginDto,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email },
      select: ['id', 'email', 'emailVerified', 'role', 'password'],
      relations: ['buyer', 'seller'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //     if (user.emailVerified === false) {
    //   throw new UnauthorizedException('Email is not verified');
    // }
    const isPasswordCorrect = await compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid password provided');
    }

    if (user.role === Role.Buyer) {
      const buyerResponse: BuyerResponseInterface = {
        buyer: { ...user.buyer, token: this.generateJwt(user) },
      };
      delete user.password;

      return buyerResponse;
    } else if (user.role === Role.Seller) {
      const sellerResponse: SellerResponseInterface = {
        seller: { ...user.seller, token: this.generateJwt(user) },
      };
      console.log('Buyer', user.buyer);
      delete user.password;

      return sellerResponse;
    }

    throw new BadRequestException('Invalid user role');
  }

  public async sendVerificationMessage(
    data: VerificationTokenPayload,
  ): Promise<void> {
    const secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_VERIFICATION_EXPIRATION',
    );
    const token = jwt.sign(data, secret, { expiresIn });

    await this.mailService.sendVerificationLetter({
      to: data.email,
      data: { token },
    });
  }

  public async verifyEmail(
    code: string,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    const { email } = await this.decodeVerificationCode(code);

    await this.userRepository.update({ email }, { emailVerified: true });

    const buyer = await this.buyerRepository.findOne({
      where: { user: { email } },
      relations: ['user'],
      select: [
        'id',
        'address',
        'image',
        'isActive',
        'lastName',
        'name',
        'phoneNumber',
        'user',
      ],
    });
    const seller = await this.sellerRepository.findOne({
      where: { user: { email } },
      select: [
        'id',
        'address',
        'image',
        'isActive',
        'phoneNumber',
        'contactPerson',
        'logo',
        'typeSaler',
        'workingHours',
        'user',
      ],
    });
    console.log('seller', seller);
    // delete seller.user.password;

    // delete buyer.user.password;

    if (buyer && buyer.user.role === Role.Buyer) {
      const buyerResponse: BuyerResponseInterface = {
        buyer: { ...buyer, token: this.generateJwt(buyer.user) },
      };

      return buyerResponse;
    }

    if (seller.user.role === Role.Seller) {
      const sellerResponse: SellerResponseInterface = {
        seller: { ...seller, token: this.generateJwt(seller.user) },
      };

      return sellerResponse;
    }

    throw new BadRequestException('Invalid user role');
  }

  private async decodeVerificationCode(
    token: string,
  ): Promise<{ email: string }> {
    try {
      const secret = this.configService.get('JWT_VERIFICATION_SECRET');

      const payload = await jwt.verify(token, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload as { email: string };
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email verification code expired');
      }

      throw new BadRequestException('Bad verification code');
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    const payload: ForgotPasswordTokenPayload = { email };

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !user.emailVerified) {
      throw new NotFoundException('User not found');
    }

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

  public async resetPassword(
    code: string,
    password: string,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    const email = await this.decodeResetPasswordCode(code);

    await this.userRepository.update({ email }, { password });

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'emailVerified', 'role', 'password'],
    });

    delete user.password;

    if (user.role === Role.Buyer) {
      return { buyer: { ...user.buyer, token: this.generateJwt(user) } };
    }

    if (user.role === Role.Seller) {
      return { seller: { ...user.seller, token: this.generateJwt(user) } };
    }

    throw new BadRequestException('Invalid user role');
  }

  private async decodeResetPasswordCode(code: string): Promise<string> {
    try {
      const secret = this.configService.get('JWT_RESET_PASSWORD_SECRET');
      const payload = await jwt.verify(code, secret);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Password reset code has expired');
      }

      throw new BadRequestException('Bad password reset code');
    }
  }
}
