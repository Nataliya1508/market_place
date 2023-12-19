import { AuthGuard } from '@app/auth/guards/auth.guard';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { User } from '@app/user/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
  @Controller('product')
  @UseGuards(AuthGuard)
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
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductEntity> {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    const product = await this.productsService.createProduct(
      currentSeller,
      createProductDto,
      cloudinaryResponse.url,
      categoryId,
    );

    return product;
  }

    @Get()
  findAll(@User() currentSeller: SellerEntity) {
    return this.productsService.findAll(currentSeller.id);
  }
}
