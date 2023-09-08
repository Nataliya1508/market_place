import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'buyers' })
export class BuyerEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nataly', description: 'buyerName' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'Khoroshun', description: 'lastName' })
  @Column('varchar')
  lastName: string;

  @ApiProperty({ example: '+3809905005050', description: 'phoneNumber' })
  @Column({ unique: true })
  phoneNumber: string;

  @ApiProperty({ example: 'false', description: 'online or offline status' })
  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => UserEntity, (user) => user.id, { eager: true })
  @JoinColumn()
  user: UserEntity;
}
