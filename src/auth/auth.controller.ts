import { AuthService } from '@app/auth/auth.service';
import { BuyerRegisterDto } from '@app/auth/dto/buyerRegister.dto';
import { ResetPasswordDto } from '@app/auth/dto/resetPassword.dto';
import {
  SellerCompanyRegisterDto,
  SellerIndividualRegisterDto,
} from '@app/auth/dto/sellerRegister.dto';
import { UserLoginDto } from '@app/auth/dto/userLogin.dto';
import { VerifyEmailDto } from '@app/auth/dto/verifyEmail.dto';
import { BuyerEntity } from '@app/buyer/buyer.entity';
import { BuyerDto } from '@app/buyer/dto/buyer.dto';
import { MailService } from '@app/mail/mail.service';
import {
  SellerCompanyDto,
  SellerIndividualDto,
} from '@app/saler/dto/seller.dto';
import { CompanyEntity } from '@app/saler/entities/company.entity';
import { IndividualEntity } from '@app/saler/entities/individual.entity';
import { User as CurrentUser } from '@app/user/decorators/user.decorator';
import { UserRole } from '@app/user/enums/userRole.enum';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/buyers/register')
  async registerBuyer(@Body() dto: BuyerRegisterDto): Promise<void> {
    await this.authService.registerBuyer(dto);
  }

  @Post('/sellers/individuals/register')
  async registerSellerIndividual(
    @Body() dto: SellerIndividualRegisterDto,
  ): Promise<void> {
    await this.authService.registerSellerIndividual(dto);
  }

  @Post('/sellers/companies/register')
  async registerSellerCompany(
    @Body() dto: SellerCompanyRegisterDto,
  ): Promise<void> {
    await this.authService.registerSellerCompany(dto);
  }

  @Post('/login')
  async login(
    @Body() dto: UserLoginDto,
  ): Promise<
    (BuyerEntity | IndividualEntity | CompanyEntity) & { token: string }
  > {
    const { role, ...userTypeEntity } = await this.authService.login(dto);

    let userDto;

    if (role === UserRole.Buyer) {
      userDto = BuyerDto.from(userTypeEntity as BuyerEntity);
    } else if (role === UserRole.SellerIndividual) {
      userDto = SellerIndividualDto.from(userTypeEntity as IndividualEntity);
    } else if (role === UserRole.SellerCompany) {
      userDto = SellerCompanyDto.from(userTypeEntity as CompanyEntity);
    }

    return { ...userDto, token: userTypeEntity.token };
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
