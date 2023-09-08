import { CompanyEntity } from '@app/saler/entities/company.entity';
import { IndividualEntity } from '@app/saler/entities/individual.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import {
  CreateCompanySeller,
  CreateIndividualSeller,
} from '@app/saler/types/createSeller.type';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserRole } from '@app/user/enums/userRole.enum';
import { UserService } from '@app/user/user.service';
import { EntityCondition } from '@app/utils/types/entityCondition.type';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
    @InjectRepository(IndividualEntity)
    private readonly individualRepository: Repository<IndividualEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async createIndividual(
    data: CreateIndividualSeller,
  ): Promise<IndividualEntity | null> {
    const { email, password, ...sellerData } = data;
    const { name, lastName, phoneNumber, ...individualData } = sellerData;

    const user = await this.userService.create({
      email,
      password,
      role: UserRole.SellerIndividual,
    });

    // FIXME: The following 3 steps should be executed as a transaction
    const seller = await this.sellerRepository.save(
      this.sellerRepository.create({
        name,
        lastName,
        phoneNumber,
        isActive: false,
        user,
      }),
    );

    const individual = await this.individualRepository.save(
      this.individualRepository.create({ ...individualData, seller }),
    );

    const createdSeller = await this.findOneIndividual({ id: individual.id });

    if (!createdSeller) {
      throw new UnprocessableEntityException('User has not been created');
    }

    return createdSeller;
  }

  public async findOneIndividual(
    options: EntityCondition<IndividualEntity>,
  ): Promise<IndividualEntity | null> {
    const queryBuilder = this.individualRepository
      .createQueryBuilder('individual')
      .innerJoinAndSelect('individual.seller', 'seller')
      .innerJoinAndSelect('seller.user', 'user')
      .where(options);

    return await queryBuilder.getOne();
  }

  public async createCompany(
    data: CreateCompanySeller,
  ): Promise<CompanyEntity | null> {
    const { email, password, ...sellerData } = data;
    const { name, lastName, phoneNumber, ...companyData } = sellerData;

    const user = await this.userService.create({
      email,
      password,
      role: UserRole.SellerCompany,
    });

    // FIXME: The following 3 steps should be executed as a transaction
    const seller = await this.sellerRepository.save(
      this.sellerRepository.create({
        name,
        lastName,
        phoneNumber,
        isActive: false,
        user,
      }),
    );

    const company = await this.companyRepository.save(
      this.companyRepository.create({
        ...companyData,
        name: companyData.companyName,
        seller,
      } as unknown as CompanyEntity),
    );

    return await this.findOneCompany({ id: company.id });
  }

  public async findOneCompany(
    options: EntityCondition<UserEntity & SellerEntity & CompanyEntity>,
  ): Promise<CompanyEntity | null> {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.seller', 'seller')
      .innerJoinAndSelect('seller.user', 'user')
      .where(options);

    return await queryBuilder.getOne();
  }

  public async findOne(
    options: EntityCondition<UserEntity & SellerEntity>,
  ): Promise<SellerEntity | null> {
    const queryBuilder = this.sellerRepository
      .createQueryBuilder('seller')
      .innerJoinAndSelect('seller.user', 'user')
      .where(options);

    return await queryBuilder.getOne();
  }
}
