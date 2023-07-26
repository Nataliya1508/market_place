import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

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

  @Column({ default: 'user' })
  role: string;

  @Column()
  phoneNumber: number;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column({ unique: true })
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
