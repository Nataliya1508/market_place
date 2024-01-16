import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, createCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async getCategoryByName(name: string): Promise<CategoryEntity | undefined> {
    return this.categoryRepository.findOne({ where: { name }, relations: ['subcategories'] });
  }
  
          async remove(categoryId: string) {
    const category = await this.categoryRepository.findOne({
    where: { id: categoryId },
  });
    if (!category) {
      throw new HttpException('Сategory not found', HttpStatus.NOT_FOUND);
    }
    await this.categoryRepository.remove(category);
    return category;
      }
}
