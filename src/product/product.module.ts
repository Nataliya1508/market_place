import { CategoryEntity } from '@app/category/entities/category.entity';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity, SubCategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
  exports: [ProductService],
})
export class ProductModule {}
