import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @Transform((params) => params?.value?.toLowerCase().trim())
  @IsEmail()
  email: string;
}
