import { VerifyEmailDto } from '@app/mail/dto/verifyEmail.dto';
import { MailService } from '@app/mail/mail.service';
import { Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

@Controller('')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('verify-email')
  async verify(@Query() dto: VerifyEmailDto) {
    const email = await this.mailService.decodeVerificationToken(dto.token);

    await this.mailService.verifyEmail(email);
  }
}
