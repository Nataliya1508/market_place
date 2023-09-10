import { UserEntity } from '@app/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sellers' })
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('varchar', { default: false })
  isActive: boolean;

  @OneToOne(() => UserEntity, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
