import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'salers' })
export class SalerEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'FreshFruit', description: 'companyName' })
  @Column()
  companyName: string;

  @ApiProperty({ example: '+3809905005050', description: 'phoneNumber' })
  @Column()
  phoneNumber: number;

  @ApiProperty({ example: 'test1@gmail.com', description: 'email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'ФОП', description: '' })
  @Column({ default: '' })
  typeSaler: string;

  @ApiProperty({
    example: 'Zolotoustivska, 13',
    description: 'address',
  })
  @Column()
  address: string;

  @ApiProperty({ example: '10-00 / 22-00', description: '' })
  @Column({ default: '' })
  workingHours: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/debx785xm/image/upload/v1674854898/samples/animals/cat.jpg',
    description: 'linkToPhoto',
  })
  @Column({ default: '' })
  image: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/debx785xm/image/upload/v1674854898/samples/animals/cat.jpg',
    description: 'linkToPhoto',
  })
  @Column({ default: '' })
  logo: string;

  @ApiProperty({ example: '', description: '' })
  @Column({ default: '' })
  aboutUs: string;

  @ApiProperty({ example: '+3809905005050', description: 'phoneNumber' })
  @Column()
  contactPerson: number;

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
