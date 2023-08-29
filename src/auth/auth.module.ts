import { MailModule } from '@app/mail/mail.module';
import { UserModule } from '@app/user/user.module';
import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MailModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
