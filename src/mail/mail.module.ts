import { BuyerModule } from '@app/buyer/buyer.module';
import { MailerModule } from '@app/mailer/mailer.module';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [MailerModule, BuyerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
