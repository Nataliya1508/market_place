import { CategoryEntity } from '@app/category/entities/category.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
         @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    )
    { }
    async createProduct(currentSeller: SellerEntity, createProductDto: CreateProductDto, imageUrl: string, categoryId: string): Promise<ProductEntity> {
        
        console.log('categoryId', categoryId)

        const product = new ProductEntity()


       Object.assign(product, createProductDto, categoryId);

        product.image = imageUrl,
            product.seller = currentSeller;

       const category = await this.categoryRepository.findOne({
           where: { id: categoryId },
           select: ['id', 'name'],
        //    relations: ['products'],
});
        
        if (!category) {
           
            throw new BadRequestException('Category not found');
        }
        product.category = category
        product.category.name = category.name
        product.createdAt = new Date()
        product.category.id = categoryId;
         

        console.log("product", product)
        return await this.productRepository.save(product);
    }
}
