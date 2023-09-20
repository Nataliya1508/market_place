// import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

// export class CreateSalerDto {
//   @IsNotEmpty()
//   readonly salerName: string;
//   @IsNotEmpty()
//   @IsEmail()
//   readonly email: string;
//   @IsNotEmpty()
//   @MinLength(8, { message: 'Password must be at least 8 characters long' })
//   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
//     message:
//       'Password must contain at least one uppercase letter, one lowercase letter, and one number',
//   })
//   readonly password: string;
// }
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateSellerDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phoneNumber: number;
  @IsNotEmpty()
  readonly companyName: string;
}