import { ProductEntity } from '@app/product/entities/product.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'enum', enum: Category, default: '' })
  // name: Category;
  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @OneToMany(() => SubCategoryEntity, (subcategory) => subcategory.category)
  subcategories: SubCategoryEntity[];
}
