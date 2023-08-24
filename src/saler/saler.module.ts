import { Module } from '@nestjs/common';
import { SalerService } from './saler.service';
import { SalerController } from './saler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalerEntity } from './saler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalerEntity])],
  providers: [SalerService],
  controllers: [SalerController],
})
export class SalerModule {}
