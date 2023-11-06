import { BuyerType } from '@app/buyer/types/buyer.type';
import { SellerType } from '@app/saler/types/seller.type';
import { UserEntity } from '@app/user/entities/user.entity';
import { CreateUser } from '@app/user/types/createUser.type';
import { EntityCondition } from '@app/utils/types/entityCondition.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { DeepPartial, Repository } from 'typeorm';

import { UserResponseInterface } from './types/userResponce.interface';

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
  buildUserResponse(user: UserEntity): UserResponseInterface {
    let userType: BuyerType | SellerType;

    if (user.buyer) {
      userType = user.buyer;
    } else if (user.seller) {
      userType = user.seller;
    }

    const userResponse: UserResponseInterface = {
      user: userType,
      token: this.generateJwt(user),
    };

    return userResponse;
  }
}
