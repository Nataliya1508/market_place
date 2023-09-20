// import { UserEntity } from '@app/user/entities/user.entity';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity({ name: 'sellers' })
// export class SellerEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar')
//   name: string;

//   @Column('varchar')
//   lastName: string;

//   @Column('varchar')
//   phoneNumber: string;

//   @Column('varchar', { default: false })
//   isActive: boolean;

//   @OneToOne(() => UserEntity, (user) => user.id, {
//     eager: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn()
//   user: UserEntity;
// }
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeSaler } from '../enums/enums';

@Entity({ name: 'salers' })
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  phoneNumber: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: TypeSaler, default: TypeSaler.PrivateTutor })
  typeSaler: TypeSaler;

  @Column()
  address: string;

  @Column({ default: '' })
  workingHours: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  logo: string;

  @Column({ default: '' })
  aboutUs: string;

  @Column()
  contactPerson: number;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => UserEntity, (seller) => seller.seller)
  @JoinColumn()
  user: SellerEntity;
}
