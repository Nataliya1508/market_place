import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'N3456g5tjnfd', description: 'Password' })
  @IsNotEmpty()
  readonly password: string;
}
