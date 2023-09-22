import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { Role } from '@app/user/enums/enums';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
  ) {}
  async createBuyer(createBuyerDto: CreateBuyerDto): Promise<BuyerEntity> {
    const user = new UserEntity();
    user.email = createBuyerDto.email;
    user.password = createBuyerDto.password;
    user.role = Role.Buyer;
    const buyer = new BuyerEntity();
    buyer.name = createBuyerDto.name;
    Object.assign(buyer, createBuyerDto);
    const buyerByEmail = await this.userRepository.findOne({
      where: { email: createBuyerDto.email },
    });
    const buyerByPhoneNumber = await this.buyerRepository.findOne({
      where: { phoneNumber: createBuyerDto.phoneNumber },
    });
    if (buyerByEmail || buyerByPhoneNumber) {
      throw new HttpException(
        'Email or Phone is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const savedUser = await this.userRepository.save(user);
    savedUser.buyer = buyer;
    await this.userRepository.save(savedUser);
    const savedBuyer = await this.buyerRepository.save(buyer);
    return savedBuyer;
  }

  async createSeller(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
    const user = new UserEntity();
    user.email = createSellerDto.email;
    user.password = createSellerDto.password;
    user.role = Role.Seller;
    const seller = new SellerEntity();
    seller.companyName = createSellerDto.companyName;
    Object.assign(seller, createSellerDto);
    const sellerByEmail = await this.userRepository.findOne({
      where: { email: createSellerDto.email },
    });
    const sellerByPhoneNumber = await this.sellerRepository.findOne({
      where: { phoneNumber: createSellerDto.phoneNumber },
    });
    if (sellerByEmail || sellerByPhoneNumber) {
      throw new HttpException(
        'Email or Phone is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const savedUser = await this.userRepository.save(user);
    savedUser.seller = seller;
    await this.userRepository.save(savedUser);
    const savedSeller = await this.sellerRepository.save(seller);
    return savedSeller;
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

  async login(
    userLoginDto: UserLoginDto,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email },
      select: ['id', 'email', 'emailVerified', 'role', 'password'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordCorrect = await compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid password provided');
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

    throw new BadRequestException('Invalid user role');
  }
}
