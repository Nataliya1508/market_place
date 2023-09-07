import { CompanyEntity } from '@app/saler/entities/company.entity';
import { IndividualEntity } from '@app/saler/entities/individual.entity';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SellerType } from '@app/saler/enums/sellerType.enum';
import {
  CreateCompanySeller,
  CreateIndividualSeller,
} from '@app/saler/types/createSeller.type';
import {
  CompanySeller,
  IndividualSeller,
  Seller,
} from '@app/saler/types/seller.type';
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
  ): Promise<IndividualSeller> {
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

    await this.individualRepository.save(
      this.individualRepository.create({ ...individualData, seller }),
    );

    const createdSeller = await this.findOneIndividual({ id: user.id });

    if (!createdSeller) {
      throw new UnprocessableEntityException('User has not been created');
    }

    return createdSeller;
  }

  public async findOneIndividual(
    options: EntityCondition<UserEntity & SellerEntity & IndividualEntity>,
  ): Promise<IndividualSeller | undefined> {
    const queryBuilder = this.individualRepository
      .createQueryBuilder('individual')
      .innerJoinAndSelect('individual.seller', 'seller')
      .innerJoinAndSelect('seller.user', 'user');

    for (const [field, value] of Object.entries(options)) {
      const entityAlias = this.getEntityAlias(field, SellerType.Individual);
      queryBuilder.andWhere(`${entityAlias}.${field} = :value`, { value });
    }

    const individual = await queryBuilder.getOne();

    if (!individual) {
      return undefined;
    }

    const transformedData = {
      id: individual.seller.user.id,
      email: individual.seller.user.email,
      role: individual.seller.user.role,
      password: individual.seller.user.password,
      emailVerified: individual.seller.user.emailVerified,
      name: individual.seller.name,
      phoneNumber: individual.seller.phoneNumber,
      lastName: individual.seller.lastName,
      isActive: individual.seller.isActive,
      image: individual.image,
      about: individual.about,
      contactPersonFullName: individual.contactPersonFullName,
      address: individual.address,
      workingHours: individual.workingHours,
      bankCardNumber: individual.bankCardNumber,
      bankCardExpirationDate: individual.bankCardNumber,
    };

    return transformedData;
  }

  public async createCompany(
    data: CreateCompanySeller,
  ): Promise<CompanySeller> {
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

    await this.companyRepository.save(
      this.companyRepository.create({
        ...companyData,
        name: companyData.companyName,
        seller,
      } as unknown as CompanyEntity),
    );

    return await this.findOneCompany({ id: user.id });
  }

  public async findOneCompany(
    options: EntityCondition<UserEntity & SellerEntity & CompanyEntity>,
  ): Promise<CompanySeller | undefined> {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.seller', 'seller')
      .innerJoinAndSelect('seller.user', 'user');

    for (const [field, value] of Object.entries(options)) {
      const entityAlias = this.getEntityAlias(field, SellerType.Company);
      queryBuilder.andWhere(`${entityAlias}.${field} = :value`, { value });
    }

    const company = await queryBuilder.getOne();

    if (!company) {
      return undefined;
    }

    const transformedData = {
      id: company.seller.user.id,
      email: company.seller.user.email,
      role: company.seller.user.role,
      password: company.seller.user.password,
      emailVerified: company.seller.user.emailVerified,
      name: company.seller.name,
      lastName: company.seller.lastName,
      isActive: company.seller.isActive,
      phoneNumber: company.seller.phoneNumber,
      companyName: company.name,
      image: company.image,
      logo: company.image,
      about: company.about,
      contactPersonFullName: company.contactPersonFullName,
      address: company.address,
      workingHours: company.workingHours,
      iban: company.iban,
      bankName: company.bankName,
      mfo: company.mfo,
      edrpou: company.edrpou,
    };

    return transformedData;
  }

  public async findOne(
    options: EntityCondition<UserEntity & SellerEntity>,
  ): Promise<Seller | undefined> {
    const queryBuilder = this.sellerRepository
      .createQueryBuilder('seller')
      .innerJoinAndSelect('seller.user', 'user');

    for (const [field, value] of Object.entries(options)) {
      const entityAlias = this.getEntityAlias(field);

      if (entityAlias) {
        queryBuilder.andWhere(`${entityAlias}.${field} = :value`, { value });
      }
    }
    const seller = await queryBuilder.getOne();

    if (!seller) {
      return undefined;
    }

    const transformedData = {
      id: seller.user.id,
      email: seller.user.email,
      role: seller.user.role,
      password: seller.user.password,
      emailVerified: seller.user.emailVerified,
      name: seller.name,
      phoneNumber: seller.phoneNumber,
      lastName: seller.lastName,
      isActive: seller.isActive,
    };

    return transformedData;
  }

  private getEntityAlias(
    field: string,
    sellerType?: SellerType,
  ): string | undefined {
    const userEntityFields = [
      'id',
      'email',
      'password',
      'role',
      'emailVerified',
    ];
    const sellerEntityFields = ['name', 'lastName', 'isActive', 'phoneNumber'];

    const sellerIndividualEntityFields = [
      'image',
      'about',
      'contactPersonFullName',
      'address',
      'workingHours',
      'bankCardNumber',
      'bankCardExpirationDate',
    ];

    const sellerCompanyEntityFields = [
      'name',
      'image',
      'logo',
      'about',
      'contactPersonFullName',
      'address',
      'workingHours',
      'iban',
      'bankName',
      'mfo',
      'edrpou',
    ];

    if (userEntityFields.includes(field)) {
      return 'user';
    }

    if (sellerEntityFields.includes(field)) {
      return 'seller';
    }

    if (
      sellerType === SellerType.Individual &&
      sellerIndividualEntityFields.includes(field)
    ) {
      return 'individual';
    }

    if (
      sellerType === SellerType.Company &&
      sellerCompanyEntityFields.includes(field)
    ) {
      return 'company';
    }
  }
}
