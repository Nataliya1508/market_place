import { BuyerModule } from '@app/buyer/buyer.module';
import { MailModule } from '@app/mail/mail.module';
import { SalerModule } from '@app/saler/saler.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MailModule, UserModule, BuyerModule, SalerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
