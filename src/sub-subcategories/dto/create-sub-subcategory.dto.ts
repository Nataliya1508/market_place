import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubSubCategoryDto {
  @IsNotEmpty()
  readonly name: string;
    
  @IsUUID()
  readonly subCategoryId: string;
}