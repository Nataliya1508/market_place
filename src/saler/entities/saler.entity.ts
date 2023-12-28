import { ProductEntity } from '@app/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeSaler } from '../enums/enums';

@Entity({ name: 'sellers' })
export class SellerEntity {
  @ApiProperty({ example: 1, description: 'Unique seller ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Egor', description: 'The first name of the seller.' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'FRUIT Company',
    description: 'The name of the company.',
  })
  @Column({ default: '' })
  companyName: string;

  @ApiProperty({
    example: '+380956789000',
    description: 'The phone number of the seller.',
  })
  @Column({ unique: true })
  phoneNumber: string;

  @ApiProperty({
    enum: TypeSaler,
    default: TypeSaler.PrivatePerson,
    description: 'The type of the seller.',
  })
  @Column({ type: 'enum', enum: TypeSaler, default: TypeSaler.PrivatePerson })
  typeSaler: TypeSaler;

  @ApiProperty({
    example: 'Saksaganskogo, 121',
    description: 'The address of the company.',
  })
  @Column({ default: '' })
  address: string;

  @ApiProperty({
    example: '9 AM - 9 PM',
    description: 'The working hours of the company.',
  })
  @Column({ default: '' })
  workingHours: string;

  @ApiProperty({
    example: 'image-url.jpg',
    description: 'The image URL of the company.',
  })
  @Column({
    default:
      'https://res.cloudinary.com/debx785xm/image/upload/v1698740839/xqj2utbevda5n8hfjkxf.jpg',
  })
  image: string;

  @ApiProperty({
    example: 'logo-url.jpg',
    description: 'The logo URL of the company.',
  })
  @Column({ default: '' })
  logo: string;

  @ApiProperty({
    example: 'About the company...',
    description: 'Information about the seller.',
  })
  @Column({ default: '' })
  aboutUs: string;

  @ApiProperty({
    example: 'Alexandr',
    description: 'The contact person of the seller.',
  })
  @Column({ nullable: true })
  contactPerson: string;

  @ApiProperty({ example: false, description: 'The status of the seller.' })
  @Column({ default: false })
  isActive: boolean;

  // @ApiProperty({ type: () => UserEntity, description: 'The associated user entity.' })
  @OneToOne(() => UserEntity, (user) => user.seller, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  // @ApiProperty({ type: () => [ProductEntity], description: 'The products associated with the seller.' })
  @OneToMany(() => ProductEntity, (product) => product.seller)
  products: ProductEntity[];
}
