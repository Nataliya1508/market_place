import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  Seller = 'seller',
  Buyer = 'buyer',
  Admin = 'admin',
}

@Entity({ name: 'buyers' })
export class BuyerEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nataly', description: 'buyerName' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Khoroshun', description: 'lastName' })
  @Column({ default: '' })
  lastName: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/debx785xm/image/upload/v1674854898/samples/animals/cat.jpg',
    description: 'linkToPhoto',
  })
  @Column({ default: '' })
  image: string;

  @ApiProperty({ example: 'buyer', description: 'user roles' })
  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @ApiProperty({ example: '+3809905005050', description: 'phoneNumber' })
  @Column({ unique: true })
  phoneNumber: number;

  @ApiProperty({ example: 'test1@gmail.com', description: 'email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'Petra Hrygorenko, 23',
    description: 'delivery address',
  })
  @Column({ default: '' })
  address: string;

  @ApiProperty({ example: 'N3456g5tjnfd', description: 'password' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'emailVerified' })
  @Column({ default: false })
  emailVerified: boolean;

  @ApiProperty({ example: 'false', description: 'online or offline status' })
  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
