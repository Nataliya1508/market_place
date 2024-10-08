import { SellerEntity } from '@app/saler/entities/saler.entity';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity]), UserModule],
  providers: [SellerService],
  controllers: [SellerController],
  exports: [SellerService],
})
export class SalerModule {}
