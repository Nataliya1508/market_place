import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  Seller = 'seller',
  Buyer = 'buyer',
  Admin = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  image: string;

  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @Column()
  phoneNumber: number;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
