import { UserRegisterDto } from '@app/auth/dto/userRegister.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class BuyerRegisterDto extends UserRegisterDto {
  @ApiProperty({
    example: 'Nataly',
    description: 'The first name of the buyer',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Smith', description: 'The last name of the user' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: '0990973689',
    description: 'The phone number of the user in the UA format',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  readonly phoneNumber: string;
}
