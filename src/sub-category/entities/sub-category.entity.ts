import { CategoryEntity } from '@app/category/entities/category.entity';
import { ProductEntity } from '@app/product/entities/product.entity';
import { SubCategoryEnum } from '@app/sub-category/enums/sub-category';
import { SubSubCategoryEntity } from '@app/sub-subcategories/entities/sub-subcategories.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sub-categories' })
export class SubCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SubCategoryEnum,
  })
  subCategory: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (subcategory) => subcategory.subcategory)
  products: ProductEntity[];

  @OneToMany(
    () => SubSubCategoryEntity,
    (subsubcategory) => subsubcategory.subcategory,
  )
  subsubcategories: SubSubCategoryEntity[];
}
