import { UserRegisterDto } from '@app/auth/dto/userRegister.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

class SellerRegisterDto extends UserRegisterDto {
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

export class SellerIndividualRegisterDto extends SellerRegisterDto {
  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsNotEmpty()
  @IsString()
  readonly about: string;

  @IsNotEmpty()
  @IsString()
  readonly contactPersonFullName: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly workingHours: string;

  @IsNotEmpty()
  @IsString()
  readonly bankCardNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly bankCardExpirationDate: string;
}

export class SellerCompanyRegisterDto extends SellerRegisterDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsString()
  contactPersonFullName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  workingHours: string;

  @IsOptional()
  @IsString()
  iban?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  mfo?: string;

  @IsOptional()
  @IsString()
  edrpou?: string;
}
