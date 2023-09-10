import { UserEntity } from '@app/user/entities/user.entity';
import { CreateUser } from '@app/user/types/createUser.type';
import { EntityCondition } from '@app/utils/types/entityCondition.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

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
}
