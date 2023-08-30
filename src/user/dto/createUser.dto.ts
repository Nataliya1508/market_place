import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nataly', description: 'userName' })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ example: 'test1@gmail.com', description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: 'N3456g5tjnfd', description: 'password' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  readonly password: string;
  @ApiProperty({ example: '0990973689', description: 'phoneNumber' })
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  readonly phoneNumber: number;
}
