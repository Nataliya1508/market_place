import { BuyerService } from '@app/buyer/buyer.service';
import { SellerService } from '@app/saler/seller.service';
import { UserEntity } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, BuyerService, SellerService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
