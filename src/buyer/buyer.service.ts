import { CreateBuyer } from '@app/buyer/types/createBuyer.type';
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

  public async create(data: CreateBuyer): Promise<BuyerEntity> {
    const { email, password, ...buyerData } = data;

    const user = await this.userService.create({ email, password });

    const foundBuyer = await this.buyerRepository.findOne({
      where: { user: { id: user.id } },
    });

    // Updating buyer's data if buyer already exists
    const buyerToCreate = foundBuyer
      ? { id: foundBuyer.id, ...buyerData }
      : { ...buyerData, user };

    return await this.buyerRepository.save(
      this.buyerRepository.create(buyerToCreate),
    );
  }

  public async findOne(
    options: EntityCondition<BuyerEntity>,
  ): Promise<BuyerEntity | null> {
    const queryBuilder = this.buyerRepository
      .createQueryBuilder('buyer')
      .innerJoinAndSelect('buyer.user', 'user')
      .where(options);

    return await queryBuilder.getOne();
  }
}
