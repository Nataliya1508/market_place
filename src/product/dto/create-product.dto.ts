import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { DeliveryPlace } from '../enums/deliveryPlace-type';

export class CreateProductDto {
  @ApiProperty({ example: 'Apple', description: 'The product name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: 'string', format: 'binary', 
    example: 'image-url.jpg',
    description: 'The image URL of the product',
  })
    // @ApiConsumes('multipart/form-data')
  readonly file: string;

  @ApiProperty({
    example: 'About the product...',
    description: 'Information about the product',
  })
  readonly description: string;

  @ApiProperty({ example: '205', description: 'CaloricContent' })
  readonly caloricContent: string;

  @ApiProperty({ example: '20', description: 'Proteins' })
  readonly proteins: string;

  @ApiProperty({ example: '2', description: 'Fats' })
  readonly fats: string;

  @ApiProperty({ example: '25', description: 'Carbohydrates' })
  readonly carbohydrates: string;

  // @IsNotEmpty()
  // readonly subcategory: string;

  @ApiProperty({ example: '40', description: 'Price' })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: '4', description: 'Quantity' })
  readonly quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unit' })
  @IsNotEmpty()
  readonly unit: string;

  // @ApiProperty({ example: 'Courier', description: 'Delivery type' })
  // @IsNotEmpty()
  // readonly deliveryTypes: [];

  // @ApiProperty({ type: 'json', description: 'Delivery types' })
  // @IsArray()
  // @IsNotEmpty()
  // readonly deliveryTypes: string[];

  @ApiProperty({ type: [String], description: 'Delivery types' })
// @IsArray()
@IsNotEmpty()
readonly deliveryTypes: string[];

  @ApiProperty({ example: [
      { place: DeliveryPlace.Kyiv, selected: true },
      { place: DeliveryPlace.Suburbs, selected: false },
      { place: DeliveryPlace.OtherCities, selected: true },
  ], description: 'Delivery types'
  })
    // @IsArray()
  @IsNotEmpty()
  readonly deliveryPlaces: { place: DeliveryPlace; selected: boolean }[];

    @ApiProperty({  description: 'CategoriId' })
@IsNotEmpty()
readonly categoryId: string;

  @ApiProperty({
    example: '+380956789000',
    description: 'The phone number of the contact person',
  })
  @IsNotEmpty()
  readonly phoneNumber: string;
}
