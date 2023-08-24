import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalerController } from './saler.controller';
import { SalerEntity } from './saler.entity';
import { SalerService } from './saler.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalerEntity])],
  providers: [SalerService],
  controllers: [SalerController],
})
export class SalerModule {}
