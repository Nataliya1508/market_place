import { UserRegisterDto } from '@app/auth/dto/userRegister.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

class SellerRegisterDto extends UserRegisterDto {
  @ApiProperty({
    example: 'John',
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

export class SellerIndividualRegisterDto extends SellerRegisterDto {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: "URL to the seller's image (optional).",
  })
  @IsOptional()
  @IsString()
  readonly image?: string;

  @ApiProperty({
    example: 'A brief description of the seller.',
    description: 'A brief description of the seller.',
  })
  @IsNotEmpty()
  @IsString()
  readonly about: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the contact person for the seller.',
  })
  @IsNotEmpty()
  @IsString()
  readonly contactPersonFullName: string;

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description: 'The address of the seller.',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({
    example: 'Mon-Fri 9:00 AM - 5:00 PM',
    description: 'Working hours of the seller',
  })
  @IsNotEmpty()
  @IsString()
  readonly workingHours: string;

  @ApiProperty({
    example: '1234123412341234',
    description: 'The bank card number.',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{16}$/, { message: 'Bad card number format' })
  readonly bankCardNumber: string;

  @ApiProperty({
    example: '12/25',
    description: 'The expiration date of the bank card (e.g., MM/YY).',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: 'Bad expiration date format',
  })
  readonly bankCardExpirationDate: string;
}

export class SellerCompanyRegisterDto extends SellerRegisterDto {
  @ApiProperty({
    example: 'ABC Corporation',
    description: 'The name of the company.',
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({
    example: 'https://example.com/company.jpg',
    description: "URL to the company's image.",
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'https://example.com/company_logo.jpg',
    description: "URL to the company's logo (optional).",
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    example: 'A brief description of the company.',
    description: 'A brief description of the company.',
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the contact person for the company.',
  })
  @IsNotEmpty()
  @IsString()
  contactPersonFullName: string;

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description: 'The address of the company.',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Mon-Fri 9:00 AM - 5:00 PM',
    description: 'Working hours of the company.',
  })
  @IsNotEmpty()
  @IsString()
  workingHours: string;

  @ApiProperty({
    example: 'UA1234567890123456789',
    description:
      'The International Bank Account Number (IBAN) of the company (optional).',
  })
  @IsOptional()
  @IsString()
  iban?: string;

  @ApiProperty({
    example: 'Bank of Example',
    description: "The name of the company's bank (optional).",
  })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty({
    example: '12345678',
    description: "The company's bank's MFO (optional).",
  })
  @IsOptional()
  @IsString()
  mfo?: string;

  @ApiProperty({
    example: '1234567890',
    description: "The company's EDRPOU (optional).",
  })
  @IsOptional()
  @IsString()
  edrpou?: string;
}
