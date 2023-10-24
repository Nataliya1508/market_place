import { BuyerService } from '@app/buyer/buyer.service';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerService } from '@app/saler/seller.service';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';

import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly buyerService: BuyerService,
    private readonly sellerService: SellerService,
    private readonly userService: UserService,
  ) {}
  @Post('/register/buyer')
  async registerBuyer(
    @Body() createBuyerDto: CreateBuyerDto,
  ): Promise<BuyerResponseInterface> {
    const buyer = await this.authService.createBuyer(createBuyerDto);

    return this.buyerService.buildBuyerResponse(buyer);
  }

  @Post('/register/seller')
  async registerSeller(
    @Body() createSellerDto: CreateSellerDto,
  ): Promise<SellerResponseInterface> {
    const seller = await this.authService.createSeller(createSellerDto);

    return this.sellerService.buildSellerResponse(seller);
  }

  @Post('/login')
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    return await this.authService.login(userLoginDto);
    // const user = await this.authService.login(userLoginDto);
    // console.log("user", user)
    //   return user;
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email verification code expired / Bad verification code',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('verify-email')
  async verify(
    @Body() dto: VerifyEmailDto,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    return await this.authService.verifyEmail(dto.code);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<void> {
    await this.authService.forgotPassword(dto.email);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Password reset code expired / Bad password reset code',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    const { code, password } = dto;
    await this.authService.resetPassword(code, password);
  }
}
