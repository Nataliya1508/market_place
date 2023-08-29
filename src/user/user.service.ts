import { AuthService } from '@app/auth/auth.service';
import { UserResponseInterface } from '@app/types/userResponse.interface';
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

import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userByEmail) {
      throw new HttpException(
        'Email is already in use ',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    const user = await this.userRepository.save(newUser);

    await this.authService.sendVerificationMessage(user.email);

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
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

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPassswordCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.password;

    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async update(
    id: number,
    payload: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.save(
      this.userRepository.create({
        id,
        ...payload,
      }),
    );
  }

  generateJwt(user: UserEntity): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    return sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      jwtSecret,
    );
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }

    return user;
  }

  public async markEmailVerified(email: string): Promise<void> {
    await this.userRepository.update({ email }, { emailVerified: true });
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
