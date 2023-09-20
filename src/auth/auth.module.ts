import { BuyerModule } from '@app/buyer/buyer.module';
import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { MailModule } from '@app/mail/mail.module';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SalerModule } from '@app/saler/saler.module';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BuyerEntity, SellerEntity]),MailModule, UserModule, BuyerModule, SalerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
