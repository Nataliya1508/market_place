import { hash } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
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
  phoneNumber: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: TypeSaler, default: TypeSaler.PrivateTutor })
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

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

    @OneToOne(() => UserEntity, (user) => user.seller,
    {
    eager: true,
    onDelete: 'CASCADE',
    })
      
  @JoinColumn()
    user: UserEntity;
  
  @BeforeInsert()
  async hashPassword() {
    if (this.user && this.user.password) {
      this.user.password = await hash(this.user.password, 10);
    }
  }
}
