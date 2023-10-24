import { ProductEntity } from '@app/product/entities/product.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubSubCategoryEnum } from '../enums/sub-sub-category';

@Entity({ name: 'sub-subcategories' })
export class SubSubCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SubSubCategoryEnum,
  })
  subCategory: string;

  //   @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  //   category: CategoryEntity;

  @ManyToOne(
    () => SubCategoryEntity,
    (subcategory) => subcategory.subsubcategories,
  )
  subcategory: SubCategoryEntity;

  @OneToMany(() => ProductEntity, (subcategory) => subcategory.subcategory)
  products: ProductEntity[];
}
