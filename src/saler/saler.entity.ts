import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'salers' })
export class SalerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  phoneNumber: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  typeSaler: string;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
