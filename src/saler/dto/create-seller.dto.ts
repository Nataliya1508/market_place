import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateSellerDto extends CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phoneNumber: number;
  @IsNotEmpty()
  readonly companyName: string;
  @IsNotEmpty()
  readonly address: string;
}