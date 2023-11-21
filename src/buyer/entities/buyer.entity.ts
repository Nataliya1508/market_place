import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'buyers' })
export class BuyerEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the buyer.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Egor', description: 'The first name of the buyer.' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Dou', description: 'The last name of the buyer.' })
  @Column({ default: '' })
  lastName: string;

  @ApiProperty({
    example: 'image-url.jpg',
    description: 'The image URL of the buyer.',
  })
  @Column({ default: '' })
  image: string;

  @ApiProperty({
    example: '+380995678900',
    description: 'The phone number of the buyer.',
  })
  @Column({ unique: true })
  phoneNumber: string;

  @ApiProperty({
    example: 'Konovaltsa, 44',
    description: 'The address of the buyer.',
  })
  @Column({ default: '' })
  address: string;

  @ApiProperty({ example: false, description: 'The status of the buyer.' })
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({
    type: () => UserEntity,
    description: 'The associated user entity.',
  })
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
