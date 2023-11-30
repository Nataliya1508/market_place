import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entities/sub-category.entity';

import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  providers: [SubCategoryService],
  // controllers: [SubCategoryController],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
