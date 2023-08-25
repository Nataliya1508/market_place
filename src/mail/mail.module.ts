import { MailerModule } from '@app/mailer/mailer.module';
import { UserModule } from '@app/user/user.module';
import { forwardRef, Module } from '@nestjs/common';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule, forwardRef(() => UserModule)],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
