import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
   @IsNotEmpty()
  readonly name: string;

  readonly image: string;

  readonly description: string;

  readonly caloricContent: string;

  readonly proteins: string;

  readonly fats: string;

  readonly carbohydrates: string;

// @IsNotEmpty()
  // readonly subcategory: string; 

  @IsNotEmpty()
  readonly price: number;

  readonly quantity: number;

  @IsNotEmpty()
  readonly unit: string;

  @IsNotEmpty()
  readonly deliveryType: string;
    @IsNotEmpty()
    readonly phoneNumber: string;

}