import { ProductEntity } from '@app/product/entities/product.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../enums/enums';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Category, default: '' })
  name: Category;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @OneToMany(() => SubCategoryEntity, (subcategory) => subcategory.category)
  subcategories: SubCategoryEntity[];
}
