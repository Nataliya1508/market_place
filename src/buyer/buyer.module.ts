import { AuthModule } from '@app/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../user/guards/auth.guard';
import { BuyerController } from './buyer.controller';
import { BuyerEntity } from './buyer.entity';
import { BuyerService } from './buyer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyerEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BuyerController],
  providers: [BuyerService, AuthGuard],
  exports: [BuyerService],
})
export class BuyerModule {}
