// import { BuyerRegisterDto } from '@app/auth/dto/buyerRegister.dto';
// import {
//   SellerCompanyRegisterDto,
//   SellerIndividualRegisterDto,
// } from '@app/auth/dto/sellerRegister.dto';
// import { UserLoginDto } from '@app/auth/dto/userLogin.dto';
// import { EmailAlreadyExistsException } from '@app/auth/exceptions/EmailAlreadyExists.exception';
// import { ForgotPasswordTokenPayload } from '@app/auth/types/forgotPasswordTokenPayload.interface';
// import { JwtPayload } from '@app/auth/types/jwtPayload.type';
// import { VerificationTokenPayload } from '@app/auth/types/verificationTokenPayload.interface';
// import { BuyerEntity } from '@app/buyer/buyer.entity';
// import { BuyerService } from '@app/buyer/buyer.service';
// import { MailService } from '@app/mail/mail.service';
// import { CompanyEntity } from '@app/saler/entities/company.entity';
// import { IndividualEntity } from '@app/saler/entities/individual.entity';
// import { SellerService } from '@app/saler/seller.service';
// import { UserEntity } from '@app/user/entities/user.entity';
// import { UserRole } from '@app/user/enums/userRole.enum';
// import { UserService } from '@app/user/user.service';
// import { EntityCondition } from '@app/utils/types/entityCondition.type';
// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { compare } from 'bcrypt';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly mailService: MailService,
//     private readonly configService: ConfigService,
//     private readonly userService: UserService,
//     private readonly buyerService: BuyerService,
//     private readonly sellerService: SellerService,
//   ) {}

//   public async registerBuyer(dto: BuyerRegisterDto): Promise<void> {
//     const { email } = dto;

//     const user = await this.userService.findOne({ email, emailVerified: true });

//     if (user) {
//       throw new EmailAlreadyExistsException(email);
//     }

//     await this.buyerService.create(dto);

//     await this.sendVerificationMessage({ email, role: UserRole.Buyer });
//   }

//   public async registerSellerIndividual(
//     dto: SellerIndividualRegisterDto,
//   ): Promise<void> {
//     const { email } = dto;

//     const user = await this.userService.findOne({ email, emailVerified: true });

//     if (user) {
//       throw new EmailAlreadyExistsException(email);
//     }

//     await this.sellerService.createIndividual(dto);

//     await this.sendVerificationMessage({
//       email,
//       role: UserRole.SellerIndividual,
//     });
//   }

//   public async registerSellerCompany(
//     dto: SellerCompanyRegisterDto,
//   ): Promise<void> {
//     const { email } = dto;

//     const user = await this.userService.findOne({ email, emailVerified: true });

//     if (user) {
//       throw new EmailAlreadyExistsException(email);
//     }

//     await this.sellerService.createCompany(dto);

//     await this.sendVerificationMessage({ email, role: UserRole.SellerCompany });
//   }

//   async login(dto: UserLoginDto): Promise<
//     (BuyerEntity | IndividualEntity | CompanyEntity) & {
//       token: string;
//       role: string;
//     }
//   > {
//     const { email, password } = dto;

//     const user = await this.userService.findOne({ email, emailVerified: true });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     const isPasswordCorrect = await compare(password, user.password);

//     if (!isPasswordCorrect) {
//       throw new BadRequestException('Invalid password provided');
//     }

//     const { role, id } = user;

//     const userData = await this.findUserByRole(role, { id });

//     if (!userData) {
//       throw new UnprocessableEntityException(
//         `User with role '${role}' and id '${id}' not found`,
//       );
//     }

//     return {
//       ...userData,
//       token: this.generateJwt({ id: userData.id, email, role }),
//       role,
//     } as (BuyerEntity | IndividualEntity | CompanyEntity) & {
//       token: string;
//       role: string;
//     };
//   }

//   private generateJwt(user: JwtPayload): string {
//     const jwtSecret = this.configService.get<string>('JWT_SECRET');

//     return jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       jwtSecret,
//     );
//   }

//   public async sendVerificationMessage(
//     data: VerificationTokenPayload,
//   ): Promise<void> {
//     const secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
//     const expiresIn = this.configService.get<string>(
//       'JWT_VERIFICATION_EXPIRATION',
//     );
//     const token = jwt.sign(data, secret, { expiresIn });

//     await this.mailService.sendVerificationLetter({
//       to: data.email,
//       data: { token },
//     });
//   }

//   public async verifyEmail(
//     token: string,
//   ): Promise<
//     (BuyerEntity | IndividualEntity | CompanyEntity) & { token: string }
//   > {
//     const { email, role } = await this.decodeVerificationToken(token);

//     await this.userService.markEmailVerified(email);

//     const userData = await this.findUserByRole(role, { email });

//     return {
//       ...userData,
//       token: this.generateJwt({ email, role, id: userData.id }),
//     } as (BuyerEntity | IndividualEntity | CompanyEntity) & { token: string };
//   }

//   private async decodeVerificationToken(
//     token: string,
//   ): Promise<{ email: string; role: UserRole }> {
//     try {
//       const secret = this.configService.get('JWT_VERIFICATION_SECRET');

//       const payload = await jwt.verify(token, secret);

//       if (
//         typeof payload === 'object' &&
//         'email' in payload &&
//         'role' in payload
//       ) {
//         return payload as { email: string; role: UserRole };
//       }

//       throw new BadRequestException();
//     } catch (error) {
//       if (error?.name === 'TokenExpiredError') {
//         throw new BadRequestException('Email verification token expired');
//       }

//       throw new BadRequestException('Bad verification token');
//     }
//   }

//   public async forgotPassword(email: string): Promise<void> {
//     const payload: ForgotPasswordTokenPayload = { email };
//     const secret = this.configService.get<string>('JWT_RESET_PASSWORD_SECRET');

//     const expiresIn = this.configService.get<string>(
//       'JWT_RESET_PASSWORD_EXPIRATION',
//     );
//     const token = jwt.sign(payload, secret, { expiresIn });

//     await this.mailService.sendForgotPasswordLetter({
//       to: email,
//       data: { token },
//     });
//   }

//   public async resetPassword(token: string, password: string): Promise<void> {
//     const email = await this.decodeResetPasswordToken(token);
//     const user = await this.userService.findOne({ email });

//     await this.userService.update(user.id, { password });
//   }

//   private async decodeResetPasswordToken(token: string): Promise<string> {
//     try {
//       const secret = this.configService.get('JWT_RESET_PASSWORD_SECRET');
//       const payload = await jwt.verify(token, secret);

//       if (typeof payload === 'object' && 'email' in payload) {
//         return payload.email;
//       }

//       throw new BadRequestException();
//     } catch (error) {
//       if (error?.name === 'TokenExpiredError') {
//         throw new BadRequestException('Password reset token has expired');
//       }

//       throw new BadRequestException('Bad password reset token');
//     }
//   }

//   private async findUserByRole(
//     role: string,
//     options: EntityCondition<UserEntity>,
//   ): Promise<BuyerEntity | IndividualEntity | CompanyEntity | undefined> {
//     if (role === UserRole.Buyer) {
//       return await this.buyerService.findOne({ user: options });
//     }

//     if (role === UserRole.SellerIndividual) {
//       return await this.sellerService.findOneIndividual({
//         seller: { user: options },
//       });
//     }

//     if (role === UserRole.SellerCompany) {
//       return await this.sellerService.findOneCompany({
//         seller: { user: options },
//       });
//     }
//   }
// }
import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';
import { Repository } from 'typeorm';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BuyerEntity) private readonly buyerRepository: Repository<BuyerEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SellerEntity) private readonly sellerRepository: Repository<SellerEntity>,
  ) {}
  async createBuyer(createBuyerDto: CreateBuyerDto): Promise<BuyerEntity> {

    const user = new UserEntity();
    user.email = createBuyerDto.email;
    user.password = createBuyerDto.password;
    const buyer = new BuyerEntity();
    buyer.name = createBuyerDto.name;
    Object.assign(buyer, createBuyerDto);
    console.log('newBuyer', buyer)
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
    savedUser.buyer = buyer;
    await this.userRepository.save(savedUser);
    const savedBuyer = await this.buyerRepository.save(buyer)
    return savedBuyer;
  }


    async createSeller(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
      const user = new UserEntity();
      console.log ('email', user.email)
    user.email = createSellerDto.email;
    user.password = createSellerDto.password;
    const seller = new SellerEntity();
    seller.companyName = createSellerDto.companyName;
    Object.assign(seller, createSellerDto);
      console.log('newSeller', seller)
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
    savedUser.seller = seller;
    await this.userRepository.save(savedUser);
    const savedSeller = await this.sellerRepository.save(seller)
    return savedSeller;
    }
  
}