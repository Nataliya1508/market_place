// import { SellerEntity } from '@app/saler/entities/saler.entity';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity({ name: 'individuals' })
// export class IndividualEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar', { nullable: true })
//   image: string | null;

//   @Column('varchar')
//   about: string;

//   @Column('varchar')
//   contactPersonFullName: string;

//   @Column('varchar')
//   address: string;

//   @Column('varchar')
//   workingHours: string;

//   @Column('varchar')
//   bankCardNumber: string;

//   @Column('varchar')
//   bankCardExpirationDate: string;

//   @OneToOne(() => SellerEntity, (seller) => seller.id, {
//     eager: true,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn()
//   seller: SellerEntity;
// }
