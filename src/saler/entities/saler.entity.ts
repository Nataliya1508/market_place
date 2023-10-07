import { hash } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeSaler } from '../enums/enums';

@Entity({ name: 'sellers' })
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  companyName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: TypeSaler, default: TypeSaler.PrivatePerson })
  typeSaler: TypeSaler;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  workingHours: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  logo: string;

  @Column({ default: '' })
  aboutUs: string;

  @Column({ nullable: true })
  contactPerson: number;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => UserEntity, (user) => user.seller, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;


}
