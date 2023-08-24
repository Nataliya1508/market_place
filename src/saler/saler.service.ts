import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalerEntity } from './saler.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config/config';
import { SalerResponseInterface } from '@app/types/salerResponse.interface';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class SalerService {
  constructor(
    @InjectRepository(SalerEntity)
    private readonly salerRepository: Repository<SalerEntity>,
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
    return sign(
      {
        id: saler.id,
        companyname: saler.companyName,
        email: saler.email,
      },
      JWT_SECRET,
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
