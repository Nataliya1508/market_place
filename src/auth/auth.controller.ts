import { BuyerService } from '@app/buyer/buyer.service';
import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SellerService } from '@app/saler/seller.service';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { User } from '@app/user/decorators/user.decorator';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    private readonly cloudinaryService: CloudinaryService
  ) { }
  @ApiOperation({ summary: 'Buyer registration' })
    @ApiResponse({status: 201, type: BuyerEntity})
  @Post('/register/buyer')
    @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async registerBuyer(
    @Body() createBuyerDto: CreateBuyerDto, @UploadedFile() file?: Express.Multer.File,
  ): Promise<BuyerResponseInterface> {
      let imageUrl: string | undefined = undefined;

  if (file) {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    imageUrl = cloudinaryResponse.url;
  } else {
    imageUrl = 'https://res.cloudinary.com/debx785xm/image/upload/v1698740839/xqj2utbevda5n8hfjkxf.jpg';
  }
    const buyer = await this.authService.createBuyer(createBuyerDto, imageUrl);

    return this.buyerService.buildBuyerResponse(buyer);
  }
  @ApiOperation({ summary: 'Seller registration' }) 
    @ApiResponse({status: 201, type: SellerEntity})
  @Post('/register/seller')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
  async registerSeller(
    @Body() createSellerDto: CreateSellerDto, @UploadedFile() file?: Express.Multer.File,
  ): Promise<SellerResponseInterface> {
          let imageUrl: string | undefined = undefined;

  if (file) {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    imageUrl = cloudinaryResponse.url;
  } else {
    imageUrl = 'https://res.cloudinary.com/debx785xm/image/upload/v1698740839/xqj2utbevda5n8hfjkxf.jpg';
  }
    // const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    const seller = await this.authService.createSeller(createSellerDto, imageUrl);

    return this.sellerService.buildSellerResponse(seller);
  }
  @ApiOperation({ summary: 'Successful response with a BuyerEntity or SellerEntity' }) 
  @ApiResponse({ status: 200, type: [BuyerEntity || SellerEntity] })
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
