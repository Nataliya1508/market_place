import { AuthGuard } from '@app/auth/guards/auth.guard';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { User } from '@app/user/decorators/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
  @Controller('product')
@UseGuards(AuthGuard)
   @ApiBearerAuth()
export class ProductController {
  usersRepository: Promise<ProductEntity>;
  constructor(
    private readonly productsService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: ProductEntity })
  @Post()
  @ApiConsumes('multipart/form-data')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @User() currentSeller: SellerEntity,
    @Body() createProductDto: CreateProductDto,
    @Body() selectedCategory: CategoryEntity,
    @Body('categoryId') categoryId: string,
    @Body('subCategoryId') subCategoryId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductEntity> {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    const product = await this.productsService.createProduct(
      currentSeller,
      createProductDto,
      cloudinaryResponse.url,
      categoryId,
      subCategoryId,
    );

    return product;
  }

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Get a list of all products for the current seller.' })
  findAll(@User() currentSeller: SellerEntity) {
    return this.productsService.findAll(currentSeller.id);
  }
  
@ApiOperation({ summary: 'Update Product', description: 'Update product information' })
@ApiParam({ name: 'id', description: 'Product id', type: 'string' })
@ApiBody({ type: UpdateProductDto, description: 'Data for updating the product' })
  @Patch(':id')
  async update(
    @User() currentSeller: SellerEntity,
    @Param('id') productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productsService.update(currentSeller.id, productId, payload);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product', description: 'Remove a product for the current seller by ID.' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  async remove(
    @User() currentSeller: SellerEntity,
    @Param('id') productId: string,
  ) {
    return await this.productsService.remove(currentSeller.id, productId);
  }
  
}
