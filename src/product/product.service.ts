import { SellerEntity } from '@app/saler/entities/saler.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,) {}
    async createProduct(currentSeller: SellerEntity, createProductDto: CreateProductDto,  imageUrl: string,): Promise<ProductEntity> {

        const product = new ProductEntity()

        Object.assign(product, createProductDto, imageUrl);
        product.image = imageUrl,
        product.seller = currentSeller;
        product.createdAt = new Date()
        return await this.productRepository.save(product);
    }
}
