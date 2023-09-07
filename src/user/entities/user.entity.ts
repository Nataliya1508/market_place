import { UserRole } from '@app/user/enums/userRole.enum';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Buyer })
  role: UserRole;

  @Column({ default: false })
  emailVerified: boolean;
}
