import { Module } from '@nestjs/common';

import { SubSubcategoriesService } from './sub-subcategories.service';
import { SubSubcategoriesController } from './sub-subcategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSubCategoryEntity } from './entities/sub-subcategories.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, SubSubCategoryEntity])],
  providers: [SubSubcategoriesService],
  controllers: [SubSubcategoriesController],
  exports: [SubSubcategoriesService],
})
export class SubSubcategoriesModule {}
