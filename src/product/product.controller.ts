import { AuthGuard } from '@app/auth/guards/auth.guard';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { Category } from '@app/category/enums/enums';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { User } from '@app/user/decorators/user.decorator';
import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
    
export class ProductController {
     usersRepository: Promise<ProductEntity>;
  constructor(private readonly productsService: ProductService, private readonly cloudinaryService: CloudinaryService,) {}

    @Post()
    @UseGuards(AuthGuard)
        @UseInterceptors(FileInterceptor('file'))
    async createProduct(@User() currentSeller: SellerEntity,
        @Body() createProductDto: CreateProductDto, @Body() selectedCategory: CategoryEntity,
          @Body('categoryId') categoryId: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ProductEntity> {
        
const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
const product = await this.productsService.createProduct(currentSeller, createProductDto, cloudinaryResponse.url, categoryId);
        return product;
    }
}
