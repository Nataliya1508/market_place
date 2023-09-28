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

@Entity({ name: 'buyers' })
export class BuyerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  image: string;

  @Column({ unique: true })
  phoneNumber: number;

  @Column({ default: '' })
  address: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => UserEntity, (user) => user.buyer, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
  // email: string;

  //   @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   if (this.user && this.user.password) {
  //     this.user.password = await hash(this.user.password, 10);
  //   }
}
// }
