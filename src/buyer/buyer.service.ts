import { AuthService } from '@app/auth/auth.service';
import { BuyerResponseInterface } from '@app/types/userResponse.interface';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { DeepPartial, Repository } from 'typeorm';

import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { BuyerEntity } from './buyer.entity';
import { UpdateBuyerDto } from './dto/updateUser.dto';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createBuyer(createUserDto: CreateUserDto): Promise<BuyerEntity> {
    const buyerByEmail = await this.buyerRepository.findOne({
      where: { email: createUserDto.email },
    });
    const buyerByPhoneNumber = await this.buyerRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });

    if (buyerByEmail || buyerByPhoneNumber) {
      throw new HttpException(
        'Email or Phone number is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newBuyer = new BuyerEntity();
    Object.assign(newBuyer, createUserDto);
    console.log('newUser', newBuyer);

    const buyer = await this.buyerRepository.save(newBuyer);

    await this.authService.sendVerificationMessage(buyer.email);

    return buyer;
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

  public async update(
    id: number,
    payload: DeepPartial<BuyerEntity>,
  ): Promise<BuyerEntity> {
    return this.buyerRepository.save(
      this.buyerRepository.create({ id, ...payload }),
    );
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

  public async findOneByEmail(email: string): Promise<BuyerEntity> {
    const user = await this.buyerRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }

    return user;
  }

  public async markEmailVerified(email: string): Promise<void> {
    await this.buyerRepository.update({ email }, { emailVerified: true });
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
