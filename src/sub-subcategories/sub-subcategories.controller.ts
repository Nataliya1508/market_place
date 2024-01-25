import { CreateSubSubCategoryDto } from '@app/sub-category/dto/create-sub-sub-category.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SubSubCategoryEntity } from './entities/sub-subcategories.entity';
import { SubSubcategoriesService } from './sub-subcategories.service';

@Controller('sub-subcategories')
export class SubSubcategoriesController {
          constructor(private readonly subSubCategoryService: SubSubcategoriesService ) {}
  @Post()
  async createCategory(
    @Body() createSubSubCategoryDto: CreateSubSubCategoryDto,
  ): Promise<SubSubCategoryEntity> {
    const subSubCategory = await this.subSubCategoryService.createSubSubCategory(
      createSubSubCategoryDto,
    );
    return subSubCategory;
  }

      @Get(':subCategoryId')
  async getAll(
    @Param('subCategoryId') subCategoryId: string,
  ) {
    return await this.subSubCategoryService.getAllBySubCategoryId(subCategoryId);
      }
    
      @Delete(':id')
  @ApiOperation({ summary: 'Remove a subSubCategory', description: 'Remove a subSubCategory by ID' })
  @ApiParam({ name: 'id', description: 'subSubCategory ID', type: String })
  async remove(
    @Param('id') subSubCategoryId: string,
  ) {
    return await this.subSubCategoryService.remove(subSubCategoryId);
  }
}
