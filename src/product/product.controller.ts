import { AuthGuard } from '@app/auth/guards/auth.guard';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { User } from '@app/user/decorators/user.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
     usersRepository: Promise<ProductEntity>;
  constructor(private readonly productsService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@User() currentSeller: SellerEntity,
        @Body() createProductDto: CreateProductDto,
    ): Promise<ProductEntity> {
        const product = await this.productsService.createProduct(currentSeller, createProductDto);

        return product;
    }
}
