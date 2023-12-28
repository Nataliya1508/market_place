import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { CreateUser } from '@app/user/types/createUser.type';
import { EntityCondition } from '@app/utils/types/entityCondition.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { DeepPartial, Repository } from 'typeorm';

import { Role } from './enums/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(data: CreateUser): Promise<UserEntity> {
    const { email } = data;
    const foundUser = await this.userRepository.findOne({ where: { email } });

    // Updating user's data if user already exists
    const userToSave = foundUser ? { id: foundUser.id, ...data } : data;

    return await this.userRepository.save(
      this.userRepository.create(userToSave),
    );
  }

  public async findOne(
    options: EntityCondition<UserEntity>,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: options });
  }

  public async update(
    id: number,
    payload: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.save(
      this.userRepository.create({ id, ...payload }),
    );
  }

  public async markEmailVerified(email: string): Promise<void> {
    await this.userRepository.update({ email }, { emailVerified: true });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(
    user: UserEntity,
  ): BuyerResponseInterface | SellerResponseInterface {
    if (user.role === Role.Buyer) {
      const buyerResponse: BuyerResponseInterface = {
        buyer: { ...user.buyer, token: this.generateJwt(user) },
      };
      delete user.password;

      return buyerResponse;
    } else if (user.role === Role.Seller) {
      const sellerResponse: SellerResponseInterface = {
        seller: { ...user.seller, token: this.generateJwt(user) },
      };
      delete user.password;

      return sellerResponse;
    }

    return {} as BuyerResponseInterface | SellerResponseInterface;
  }

  async currentUser(
    currentUser: UserEntity,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { email: currentUser.email },
      select: ['id', 'email', 'emailVerified', 'role', 'password'],
      relations: ['buyer', 'seller'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === Role.Buyer) {
      const buyerResponse: BuyerResponseInterface = {
        buyer: { ...user.buyer, token: this.generateJwt(user) },
      };
      delete user.password;

      return buyerResponse;
    } else if (user.role === Role.Seller) {
      const sellerResponse: SellerResponseInterface = {
        seller: { ...user.seller, token: this.generateJwt(user) },
      };
      delete user.password;

      return sellerResponse;
    }
  }
}
