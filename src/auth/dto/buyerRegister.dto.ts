import { UserRegisterDto } from '@app/auth/dto/userRegister.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class BuyerRegisterDto extends UserRegisterDto {
  @ApiProperty({ example: 'Nataly', description: 'userName' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: '0990973689', description: 'phoneNumber' })
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  readonly phoneNumber: string;
}
