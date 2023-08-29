import { AuthService } from '@app/auth/auth.service';
import { ResetPasswordDto } from '@app/auth/dto/resetPassword.dto';
import { VerifyEmailDto } from '@app/auth/dto/verifyEmail.dto';
import { MailService } from '@app/mail/mail.service';
import { User } from '@app/user/decorators/user.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}
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
  async forgotPassword(@User('email') email: string): Promise<void> {
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
