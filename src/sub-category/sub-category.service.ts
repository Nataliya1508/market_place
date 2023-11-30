import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { SubCategoryEntity } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly categoryRepository: Repository<SubCategoryEntity>,
  ) {}
  async createSubCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<SubCategoryEntity> {
    const subCategory = new SubCategoryEntity();
    Object.assign(subCategory, createCategoryDto);

    return await this.categoryRepository.save(subCategory);
  }
}

