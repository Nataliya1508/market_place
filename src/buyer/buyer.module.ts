// import { UserModule } from '@app/user/user.module';
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthGuard } from '../auth/guards/auth.guard';
// import { BuyerController } from './buyer.controller';

// import { BuyerEntity } from './entities/buyer.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([BuyerEntity]), UserModule],
//   controllers: [BuyerController],
//   providers: [BuyerService, AuthGuard],
//   exports: [BuyerService],
// })
// export class BuyerModule {}
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
