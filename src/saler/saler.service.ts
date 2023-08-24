import { SalerResponseInterface } from '@app/types/salerResponse.interface';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { SalerEntity } from './saler.entity';

@Injectable()
export class SalerService {
  constructor(
    @InjectRepository(SalerEntity)
    private readonly salerRepository: Repository<SalerEntity>,
    private readonly configService: ConfigService,
  ) {}
  async createSaler(createSalerDto: CreateUserDto): Promise<SalerEntity> {
    const salerByEmail = await this.salerRepository.findOne({
      where: { email: createSalerDto.email },
    });

    if (salerByEmail) {
      throw new HttpException(
        'Email is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newSaler = new SalerEntity();
    Object.assign(newSaler, createSalerDto);
    console.log('newSaler', newSaler);

    return await this.salerRepository.save(newSaler);
  }
  async login(loginSalerDto: LoginUserDto): Promise<SalerEntity> {
    const saler = await this.salerRepository.findOne({
      where: { email: loginSalerDto.email },
      select: [
        'id',
        'companyName',
        'phoneNumber',
        'email',
        'typeSaler',
        'address',
        'workingHours',
        'image',
        'logo',
        'aboutUs',
        'contactPerson',
        'emailVerified',
        'isActive',
      ],
    });

    if (!saler) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassswordCorrect = await compare(
      loginSalerDto.password,
      saler.password,
    );

    if (!isPassswordCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete saler.password;

    return saler;
  }

  generateJwt(saler: SalerEntity): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    return sign(
      {
        id: saler.id,
        companyname: saler.companyName,
        email: saler.email,
      },
      jwtSecret,
    );
  }

  buildSalerResponse(saler: SalerEntity): SalerResponseInterface {
    return {
      saler: {
        ...saler,
        token: this.generateJwt(saler),
      },
    };
  }
}
