import { AuthService } from '@app/auth/auth.service';
import { BuyerRegisterDto } from '@app/auth/dto/buyerRegister.dto';
import { ResetPasswordDto } from '@app/auth/dto/resetPassword.dto';
import {
  SellerCompanyRegisterDto,
  SellerIndividualRegisterDto,
} from '@app/auth/dto/sellerRegister.dto';
import { UserLoginDto } from '@app/auth/dto/userLogin.dto';
import { VerifyEmailDto } from '@app/auth/dto/verifyEmail.dto';
import { Buyer } from '@app/buyer/types/buyer.type';
import { MailService } from '@app/mail/mail.service';
import { CompanySeller, IndividualSeller } from '@app/saler/types/seller.type';
import { UserResponseInterface } from '@app/types/userResponse.interface';
import { User as CurrentUser } from '@app/user/decorators/user.decorator';
import { User } from '@app/user/types/user.type';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @Post('/buyers/register')
  async registerBuyer(
    @Body() dto: BuyerRegisterDto,
  ): Promise<UserResponseInterface<Buyer>> {
    return await this.authService.registerBuyer(dto);
  }

  @Post('/sellers/individuals/register')
  async registerSellerIndividual(
    @Body() dto: SellerIndividualRegisterDto,
  ): Promise<UserResponseInterface<IndividualSeller>> {
    return await this.authService.registerSellerIndividual(dto);
  }

  @Post('/sellers/companies/register')
  async registerSellerCompany(
    @Body() dto: SellerCompanyRegisterDto,
  ): Promise<UserResponseInterface<CompanySeller>> {
    return await this.authService.registerSellerCompany(dto);
  }

  @Post('/login')
  async loginBuyer(
    @Body() dto: UserLoginDto,
  ): Promise<UserResponseInterface<User>> {
    return await this.authService.login(dto);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Email is already confirmed / Email verification token expired / Bad verification token',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('verify-email')
  async verify(@Body() dto: VerifyEmailDto): Promise<void> {
    await this.authService.verifyEmail(dto.token);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  async forgotPassword(@CurrentUser('email') email: string): Promise<void> {
    await this.authService.forgotPassword(email);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Password reset token has expired / Bad password reset token',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    const { token, password } = dto;
    await this.authService.resetPassword(token, password);
  }
}
