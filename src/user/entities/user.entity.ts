import { SellerEntity } from '@app/saler/entities/saler.entity';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BuyerEntity } from 'src/buyer/entities/buyer.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../enums/enums';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: false, description: 'The status of email verification' })
  @Exclude()
  @Column({ default: false })
  emailVerified: boolean;

  // @Exclude()
  @ApiProperty({ example: '12D45tjjghg', description: 'User password' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ enum: Role, default: Role, description: 'User role' })
  @Column({ type: 'enum', enum: Role, default: Role})
  role: Role;

  // @ApiProperty({ type: () => BuyerEntity, description: 'The associated buyer entity.' })
  @OneToOne(() => BuyerEntity, (buyer) => buyer.user)
  buyer: BuyerEntity;

  // @ApiProperty({ type: () => SellerEntity, description: 'The associated seller entity.' })
  @OneToOne(() => SellerEntity, (seller) => seller.user)
  seller: SellerEntity;

  // @BeforeUpdate()

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
