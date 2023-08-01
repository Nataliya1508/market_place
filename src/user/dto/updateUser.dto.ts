import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(6)
  readonly password: string;
  readonly phoneNumber: number;
  readonly image: string;
  readonly address: string;
}
