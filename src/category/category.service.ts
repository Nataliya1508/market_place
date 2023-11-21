import { CreateProductDto } from '@app/product/dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {

        const category = new CategoryEntity;
        Object.assign(category, createCategoryDto);

        return await this.categoryRepository.save(category)
    }
}
