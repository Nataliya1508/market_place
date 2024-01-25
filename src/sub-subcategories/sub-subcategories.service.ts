import { CreateSubSubCategoryDto } from '@app/sub-category/dto/create-sub-sub-category.dto';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubSubCategoryEntity } from './entities/sub-subcategories.entity';

@Injectable()
export class SubSubcategoriesService {
    constructor(
    @InjectRepository(SubSubCategoryEntity)
    private readonly subSubCategoryRepository: Repository<SubSubCategoryEntity>,
        @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}
  async createSubSubCategory(
    createSubSubCategoryDto: CreateSubSubCategoryDto,
  ): Promise<SubSubCategoryEntity> {
        const { name, subCategoryId } = createSubSubCategoryDto;

    if (!subCategoryId) {
      throw new BadRequestException('subCategory identifier is required.');
    }
    
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
      select: ['id', 'name'],
    });

    if (!subCategory) {
      throw new NotFoundException(`subCategory with ID ${subCategoryId} not found.`);
    }
    const subSubCategory = new SubSubCategoryEntity();
    Object.assign(subSubCategory, createSubSubCategoryDto);
   subSubCategory.name = name;
    subSubCategory.subcategory = subCategory;
    return await this.subSubCategoryRepository.save(subSubCategory);
  }

  async getAllBySubCategoryId(subCategoryId: string) {
    return await this.subSubCategoryRepository.find({
      where: { subcategory: { id: subCategoryId } },
      select: ['id', 'name'],
    });
  }

        async remove(subSubCategoryId: string) {
    const subSubCategory = await this.subSubCategoryRepository.findOne({
    where: { id: subSubCategoryId },
  });
    if (!subSubCategory) {
      throw new HttpException('SubSubCategory not found', HttpStatus.NOT_FOUND);
    }
    await this.subSubCategoryRepository.remove(subSubCategory);
    return subSubCategory;
      }
}
