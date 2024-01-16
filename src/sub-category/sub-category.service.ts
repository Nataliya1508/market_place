import { CategoryEntity } from '@app/category/entities/category.entity';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryEntity } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
        @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategoryEntity> {
        const { name, categoryId } = createSubCategoryDto;

    if (!categoryId) {
      throw new BadRequestException('Category identifier is required.');
    }
    
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      select: ['id', 'name'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found.`);
    }
    const subCategory = new SubCategoryEntity();
    Object.assign(subCategory, createSubCategoryDto);
   subCategory.name = name;
    subCategory.category = category;
    return await this.subCategoryRepository.save(subCategory);
  }

  async getAllByCategoryId(categoryId: string) {
    return await this.subCategoryRepository.find({
      where: { category: { id: categoryId } },
      select: ['id', 'name'],
    });
  }

        async remove(subCategoryId: string) {
    const subCategory = await this.subCategoryRepository.findOne({
    where: { id: subCategoryId },
  });
    if (!subCategory) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
    await this.subCategoryRepository.remove(subCategory);
    return subCategory;
      }
}
