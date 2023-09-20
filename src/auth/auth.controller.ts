// import { AuthService } from '@app/auth/auth.service';
// import { BuyerRegisterDto } from '@app/auth/dto/buyerRegister.dto';
// import { ResetPasswordDto } from '@app/auth/dto/resetPassword.dto';
// import {
//   SellerCompanyRegisterDto,
//   SellerIndividualRegisterDto,
// } from '@app/auth/dto/sellerRegister.dto';
// import { UserLoginDto } from '@app/auth/dto/userLogin.dto';
// import { VerifyEmailDto } from '@app/auth/dto/verifyEmail.dto';
// import { BuyerEntity } from '@app/buyer/buyer.entity';
// import { MailService } from '@app/mail/mail.service';
// import { CompanyEntity } from '@app/saler/entities/company.entity';
// import { IndividualEntity } from '@app/saler/entities/individual.entity';
// import { User } from '@app/user/decorators/user.decorator';
// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly mailService: MailService,
//     private readonly authService: AuthService,
//   ) {}

//   @ApiResponse({ status: HttpStatus.CREATED })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Email address [email] is already in use',
//   })
//   @Post('/buyers/register')
//   async registerBuyer(@Body() dto: BuyerRegisterDto): Promise<void> {
//     await this.authService.registerBuyer(dto);
//   }

//   @ApiResponse({ status: HttpStatus.CREATED })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Email address [email] is already in use',
//   })
//   @Post('/sellers/individuals/register')
//   async registerSellerIndividual(
//     @Body() dto: SellerIndividualRegisterDto,
//   ): Promise<void> {
//     await this.authService.registerSellerIndividual(dto);
//   }

//   @ApiResponse({ status: HttpStatus.CREATED })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Email address [email] is already in use',
//   })
//   @Post('/sellers/companies/register')
//   async registerSellerCompany(
//     @Body() dto: SellerCompanyRegisterDto,
//   ): Promise<void> {
//     await this.authService.registerSellerCompany(dto);
//   }

//   @ApiResponse({ status: HttpStatus.CREATED })
//   @ApiResponse({
//     status: HttpStatus.NOT_FOUND,
//     description: 'User not found',
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Invalid password provided',
//   })
//   @ApiResponse({
//     status: HttpStatus.UNPROCESSABLE_ENTITY,
//     description: 'User with role [role] and id [id] not found',
//   })
//   @Post('/login')
//   async login(
//     @Body() dto: UserLoginDto,
//   ): Promise<
//     (BuyerEntity | IndividualEntity | CompanyEntity) & { token: string }
//   > {
//     return await this.authService.login(dto);
//   }

//   @ApiResponse({ status: HttpStatus.OK })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Email verification token expired / Bad verification token',
//   })
//   @HttpCode(HttpStatus.OK)
//   @Patch('verify-email')
//   async verify(
//     @Body() dto: VerifyEmailDto,
//   ): Promise<
//     (BuyerEntity | IndividualEntity | CompanyEntity) & { token: string }
//   > {
//     return await this.authService.verifyEmail(dto.code);
//   }

//   @ApiResponse({ status: HttpStatus.NO_CONTENT })
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @Post('forgot-password')
//   async forgotPassword(@User('email') email: string): Promise<void> {
//     await this.authService.forgotPassword(email);
//   }

//   @ApiResponse({ status: HttpStatus.NO_CONTENT })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Password reset token has expired / Bad password reset token',
//   })
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @Patch('reset-password')
//   async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
//     const { code, password } = dto;
//     await this.authService.resetPassword(code, password);
//   }
// }
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register/buyer')
  async registerBuyer(@Body('buyer') createBuyerDto: CreateBuyerDto) {
    // console.log('createBuyerDTO', createBuyerDto);
    return this.authService.createBuyer(createBuyerDto);
    
  }
    @Post('/register/seller')
  async registerSeller(@Body('seller') createSellerDto: CreateSellerDto) {
    // console.log('createSellerDTO', createSellerDto);
    return this.authService.createSeller(createSellerDto);
    
  }
}