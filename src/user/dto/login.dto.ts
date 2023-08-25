import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'Nataly', description: 'userName' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '0990973689', description: 'phoneNumber' })
  @IsNotEmpty()
  readonly password: string;
}
