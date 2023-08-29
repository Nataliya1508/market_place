import { MailerModule } from '@app/mailer/mailer.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [MailerModule, UserModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
