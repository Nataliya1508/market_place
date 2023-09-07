import { Buyer } from '@app/buyer/types/buyer.type';
import { CreateBuyer } from '@app/buyer/types/createBuyer.type';
import { UserEntity } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { EntityCondition } from '@app/utils/types/entityCondition.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BuyerEntity } from './buyer.entity';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async create(data: CreateBuyer): Promise<Buyer> {
    const { email, password, ...buyerData } = data;

    const user = await this.userService.create({ email, password });

    const buyer = await this.buyerRepository.save(
      this.buyerRepository.create({ ...buyerData, user }),
    );

    return await this.findOne({ id: buyer.id });
  }

  public async findOne(
    options: EntityCondition<UserEntity & BuyerEntity>,
  ): Promise<Buyer | undefined> {
    const queryBuilder = this.buyerRepository
      .createQueryBuilder('buyer')
      .innerJoinAndSelect('buyer.user', 'user');

    for (const [field, value] of Object.entries(options)) {
      const entityAlias = this.getEntityAlias(field);
      queryBuilder.andWhere(`${entityAlias}.${field} = :value`, { value });
    }

    const buyer = await queryBuilder.getOne();

    if (!buyer) {
      return undefined;
    }

    const transformedData = {
      id: buyer.user.id,
      email: buyer.user.email,
      role: buyer.user.role,
      password: buyer.user.password,
      emailVerified: buyer.user.emailVerified,
      name: buyer.name,
      lastName: buyer.lastName,
      phoneNumber: buyer.phoneNumber,
      isActive: buyer.isActive,
    };

    return transformedData;
  }

  private getEntityAlias(field: string): string | undefined {
    const userEntityFields = ['email', 'password', 'role', 'emailVerified'];

    const buyerEntityFields = [
      'id',
      'name',
      'lastName',
      'phoneNumber',
      'isActive',
    ];

    if (userEntityFields.includes(field)) {
      return 'user';
    }

    if (buyerEntityFields.includes(field)) {
      return 'buyer';
    }
  }
}
