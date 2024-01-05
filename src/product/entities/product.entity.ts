import { CategoryEntity } from '@app/category/entities/category.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SubCategoryEntity } from '@app/sub-category/entities/sub-category.entity';
import { SubSubCategoryEntity } from '@app/sub-subcategories/entities/sub-subcategories.entity';
import { ApiProperty } from '@nestjs/swagger';
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
import { DeliveryPlace } from '../enums/deliveryPlace-type';

@Entity({ name: 'products' })
export class ProductEntity {
  @ApiProperty({ example: 1, description: 'Unique seller ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Apple', description: 'The product name' })
  @Column()
  name: string;

  @ApiProperty({  type: 'string', format: 'binary', 
    example: 'image-url.jpg',
    description: 'The image URL of the product',
  })
  
  @Column({ default: '' })
  image: string;

  @ApiProperty({
    example: 'About the product...',
    description: 'Information about the product',
  })
  @Column({ default: '' })
  description: string;

  @ApiProperty({ example: false, description: 'Favorites product' })
  @Column({ default: false })
  favorites: boolean;

  @ApiProperty({ example: '205', description: 'CaloricContent' })
  @Column({ default: '' })
  caloricContent: string;

  @ApiProperty({ example: '20', description: 'Proteins' })
  @Column({ default: '' })
  proteins: string;

  @ApiProperty({ example: '2', description: 'Fats' })
  @Column({ default: '' })
  fats: string;

  @ApiProperty({ example: '25', description: 'Carbohydrates' })
  @Column({ default: '' })
  carbohydrates: string;

  @ApiProperty({ example: '40', description: 'Price' })
  @Column({ nullable: true })
  price: number;

  @ApiProperty({ example: '4', description: 'Quantity' })
  @Column({ nullable: true })
  quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unit' })
  @Column({ nullable: true })
  unit: string;

  // @ApiProperty({ example: 'Courier', description: 'Delivery type' })
  // @Column({ type: 'enum', enum: DeliveryType })
  // deliveryType: string;
@ApiProperty({ type: 'json', example: 'Courier', description: 'Delivery types' })
  @Column({ type: 'json', nullable: true })
  deliveryTypes: string[];

  @ApiProperty({ example: 'Saksaganskogo, 121', description: 'Pickup address' })
  @Column({ nullable: true })
  address: string;

    @ApiProperty({
    type: 'json',
    description: 'Delivery places',
    example: [
      { place: DeliveryPlace.Kyiv, selected: true },
      { place: DeliveryPlace.Suburbs, selected: false },
      { place: DeliveryPlace.OtherCities, selected: true },
    ],
  })
  @Column({ type: 'json', nullable: true })
  deliveryPlaces: { place: DeliveryPlace; selected: boolean }[];


  @ApiProperty({
    example: '+380956789000',
    description: 'The phone number of the contact person',
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({ example: '2023-11-21', description: 'Creation date' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: 'true', description: 'Special offer' })
  @Column({ nullable: true })
  specialOffer: boolean;

  @ApiProperty({ example: 'false', description: 'Top product' })
  @Column({ nullable: true })
  topProduct: boolean;

  @ApiProperty({ example: 'false', description: 'New product' })
  @Column({ nullable: true })
  newProduct: boolean;

  @ApiProperty({ example: 'false', description: 'Active' })
  @Column({ nullable: true })
  isActive: boolean;

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

  @ApiProperty({ type: () => CategoryEntity, description: 'Product category' })
  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: CategoryEntity;

  @ApiProperty({
    type: () => SubCategoryEntity,
    description: 'Product subcategory',
  })
  @ManyToOne(() => SubCategoryEntity, (subcategory) => subcategory.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subcategory: SubCategoryEntity;

  @ApiProperty({
    type: () => SubSubCategoryEntity,
    description: 'Product subsubcategory',
  })
  @ManyToOne(
    () => SubSubCategoryEntity,
    (subsubcategory) => subsubcategory.products,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  subsubcategory: SubCategoryEntity;
}
