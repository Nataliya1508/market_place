import { hash } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  //   @OneToOne(() => UserEntity, (user) => user.id, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  // })

  @OneToOne(() => UserEntity, (user) => user.buyer,
    {
    eager: true,
    onDelete: 'CASCADE',
    })
      
  @JoinColumn()
    user: UserEntity;
  
    @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.user && this.user.password) {
      this.user.password = await hash(this.user.password, 10);
    }
  }
}
  // @OneToOne(() => UserEntity, (user) => user.buyer)
  // user: UserEntity;

  //   @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }

