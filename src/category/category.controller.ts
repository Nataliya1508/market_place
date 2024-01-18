import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Product')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
    );

    return category;
  }
  @Get('subcategories')
    getSubcategories(@Query('category') category: string) {
    return this.categoryService.getCategoryByName(category);
  }
    @Get()
    getAllCategories() {
    return this.categoryService.getAllCategories();
  }

        @Delete(':id')
  @ApiOperation({ summary: 'Remove a category', description: 'Remove a category by ID' })
  @ApiParam({ name: 'id', description: 'category ID', type: String })
  async remove(
    @Param('id') categoryId: string,
  ) {
    return await this.categoryService.remove(categoryId);
  }
}
