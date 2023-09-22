import { SellerController } from '@app/saler/seller.controller';
import { SellerService } from '@app/saler/seller.service';
import { Module } from '@nestjs/common';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';

@Module({
  controllers: [BuyerController, SellerController],
  providers: [BuyerService, SellerService],
})
export class BuyerModule {}
