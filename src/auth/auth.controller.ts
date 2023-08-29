import { AuthService } from '@app/auth/auth.service';
import { ResetPasswordDto } from '@app/auth/dto/resetPassword.dto';
import { VerifyEmailDto } from '@app/auth/dto/verifyEmail.dto';
import { MailService } from '@app/mail/mail.service';
import { User } from '@app/user/decorators/user.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('verify-email')
  async verify(@Query() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto.token);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  async forgotPassword(@User('email') email: string): Promise<void> {
    await this.authService.forgotPassword(email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    const { token, password } = dto;
    await this.authService.resetPassword(token, password);
  }
}
