import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => UserEntity, (user) => user.buyer)
  user: UserEntity;
}
