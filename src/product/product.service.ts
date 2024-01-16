import { CategoryEntity } from '@app/category/entities/category.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeliveryType } from './enums/delivery-type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}
  async createProduct(
    currentSeller: SellerEntity,
    createProductDto: CreateProductDto,
    imageUrl: string,
    categoryId: string,
    subCategoryId: string,
  ): Promise<ProductEntity> {
    console.log('categoryId', categoryId);

    const product = new ProductEntity();

    Object.assign(product, createProductDto, categoryId, subCategoryId);

    (product.image = imageUrl), (product.seller = currentSeller);

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      select: ['id', 'name'],
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

        const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
      select: ['id', 'name'],
    });

    if (!subCategory) {
      throw new BadRequestException('SubCategory not found');
    }
    product.category = category;
    product.category.name = category.name;
    product.subcategory = subCategory;
    // product.subsubcategory.name = subCategory.name;
    product.createdAt = new Date();
    product.category.id = categoryId;
    product.deliveryTypes = product.deliveryTypes,

    console.log('product', product);

    return await this.productRepository.save(product);
  }

    async findAll(sellerId: number, ) {
    const products = await this.productRepository.findBy({ seller: { id: sellerId } });
    return products;
    }
  
    async update(sellerId: number, productId: string, payload: UpdateProductDto) {
    const productExist = await this.productRepository.exist({
      where: { id: productId, seller: { id: sellerId } },
    });
    if (!productExist) return;
    
    await this.productRepository.update(productId, payload);
    const updateProduct = await this.findOne(sellerId, productId);
    return updateProduct;
  }
  
      async remove(sellerId: number, productId: string) {
    const product = await this.productRepository.findOne({
    where: { id: productId, seller: { id: sellerId } },
  });
    if (!product) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.remove(product);
    return product;
      }
  
    async findOne(sellerId: number, productId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: productId, seller: { id: sellerId } },
    });
    if (!product) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
