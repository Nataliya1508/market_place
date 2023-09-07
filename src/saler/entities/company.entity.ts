import { SellerEntity } from '@app/saler/entities/saler.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'companies' })
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  image: string;

  @Column('varchar', { nullable: true })
  logo: string | null;

  @Column('varchar')
  about: string;

  @Column('varchar')
  contactPersonFullName: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  workingHours: string;

  @Column('varchar', { nullable: true })
  iban: string | null;

  @Column('varchar', { nullable: true })
  bankName: string | null;

  @Column('varchar', { nullable: true })
  mfo: string | null;

  @Column('varchar', { nullable: true })
  edrpou: string | null;

  @OneToOne(() => SellerEntity, (seller) => seller.id)
  @JoinColumn()
  seller: SellerEntity;
}
