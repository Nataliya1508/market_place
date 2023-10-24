import { CategoryEntity } from '@app/category/entities/category.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { SubSubCategoryEntity } from '@app/sub-subcategories/entities/sub-subcategories.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DeliveryType } from '../enums/delivery-type';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  favorites: boolean;

  @Column({ default: '' })
  caloricContent: string;

  @Column({ default: '' })
  proteins: string;

  @Column({ default: '' })
  fats: string;

  @Column({ default: '' })
  carbohydrates: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'enum', enum: DeliveryType })
  deliveryType: DeliveryType;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true })
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true })
  specialOffer: boolean;

  @Column({ nullable: true })
  topProduct: boolean;

  @Column({ nullable: true })
  newProduct: boolean;

  @BeforeInsert()
  setNewStatus() {
    const now = new Date();
    const notNew = new Date(now.getTime() - 12 * 60 * 60 * 1000);

    if (this.createdAt >= notNew) {
      this.newProduct = true;
    } else {
      this.newProduct = false;
    }
  }

  @ManyToOne(() => SellerEntity, (seller) => seller.products)
  seller: SellerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, (subcategory) => subcategory.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subcategory: SubCategoryEntity;

  @ManyToOne(
    () => SubSubCategoryEntity,
    (subsubcategory) => subsubcategory.products,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  subsubcategory: SubCategoryEntity;
}
