import { CreateCategoryDto } from '@app/category/dto/create-category.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@ApiTags('Product')
@Controller('sub-category')
export class SubCategoryController {
      constructor(private readonly subCategoryService: SubCategoryService) {}
  @Post()
  async createCategory(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategoryEntity> {
    const subCategory = await this.subCategoryService.createSubCategory(
      createSubCategoryDto,
    );
console.log(createSubCategoryDto)
    return subCategory;
  }

      @Get(':categoryId')
  async getAll(
    @Param('categoryId') categoryId: string,
  ) {
    return await this.subCategoryService.getAllByCategoryId(categoryId);
      }
    
      @Delete(':id')
  @ApiOperation({ summary: 'Remove a subCategory', description: 'Remove a subCategory by ID' })
  @ApiParam({ name: 'id', description: 'subCategory ID', type: String })
  async remove(
    @Param('id') subCategoryId: string,
  ) {
    return await this.subCategoryService.remove(subCategoryId);
  }
}
