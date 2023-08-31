import { BuyerModule } from '@app/buyer/buyer.module';
import { MailModule } from '@app/mail/mail.module';
import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MailModule, forwardRef(() => BuyerModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
