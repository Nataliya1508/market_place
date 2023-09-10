import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @Transform((params) => params?.value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
