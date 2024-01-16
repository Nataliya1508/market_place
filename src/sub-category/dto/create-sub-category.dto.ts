import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  readonly name: string;
    
  @IsUUID()
  readonly categoryId: string;
}