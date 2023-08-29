import { BuyerResponseInterface } from '@app/types/userResponse.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UpdateBuyerDto } from './dto/updateUser.dto';
import { BuyerEntity } from './buyer.entity';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createBuyer(createUserDto: CreateUserDto): Promise<BuyerEntity> {
    const buyerByEmail = await this.buyerRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (buyerByEmail) {
      throw new HttpException(
        'Email is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newBuyer = new BuyerEntity();
    Object.assign(newBuyer, createUserDto);
    console.log('newUser', newBuyer);

    return await this.buyerRepository.save(newBuyer);
  }

  async login(loginUserDto: LoginUserDto): Promise<BuyerEntity> {
    const buyer = await this.buyerRepository.findOne({
      where: { email: loginUserDto.email },
      select: [
        'id',
        'address',
        'email',
        'emailVerified',
        'lastName',
        'image',
        'phoneNumber',
        'password',
        'lastName',
        'isActive',
        'name',
      ],
    });

    if (!buyer) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassswordCorrect = await compare(
      loginUserDto.password,
      buyer.password,
    );

    if (!isPassswordCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete buyer.password;

    return buyer;
  }

  findById(id: number): Promise<BuyerEntity> {
    return this.buyerRepository.findOne({ where: { id } });
  }

  async updateBuyer(
    userId: number,
    updateBuyerDto: UpdateBuyerDto,
  ): Promise<BuyerEntity> {
    const buyer = await this.findById(userId);
    Object.assign(buyer, updateBuyerDto);

    return await this.buyerRepository.save(buyer);
  }

  generateJwt(buyer: BuyerEntity): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    return sign(
      {
        id: buyer.id,
        name: buyer.name,
        email: buyer.email,
      },
      jwtSecret,
    );
  }

  buildBuyerResponse(buyer: BuyerEntity): BuyerResponseInterface {
    return {
      user: {
        ...buyer,
        token: this.generateJwt(buyer),
      },
    };
  }
}
