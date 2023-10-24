import { SellerEntity } from '@app/saler/entities/saler.entity';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ default: false })
  emailVerified: boolean;

  // @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @OneToOne(() => BuyerEntity, (buyer) => buyer.user)
  buyer: BuyerEntity;

  @OneToOne(() => SellerEntity, (seller) => seller.user)
  seller: SellerEntity;

  // @BeforeUpdate()

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
