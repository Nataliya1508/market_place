// import { UserRole } from '@app/user/enums/userRole.enum';
// import { hash } from 'bcrypt';
// import {
//   BeforeInsert,
//   BeforeUpdate,
//   Column,
//   Entity,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity({ name: 'users' })
// export class UserEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @BeforeInsert()
//   @BeforeUpdate()
//   async hashPassword() {
//     this.password = await hash(this.password, 10);
//   }

//   @Column({ type: 'enum', enum: UserRole, default: UserRole.Buyer })
//   role: UserRole;

//   @Column({ default: false })
//   emailVerified: boolean;
// }
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BuyerEntity } from 'src/buyer/entities/buyer.entity';
// import { SellerEntity } from 'src/seller/entities/seller.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
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

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @OneToOne(() => BuyerEntity, (buyer) => buyer.user)
  @JoinColumn()
  buyer: BuyerEntity;

  @OneToOne(() => SellerEntity, (seller) => seller.user)
  @JoinColumn()
  seller: SellerEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
