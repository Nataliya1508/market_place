import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateBuyerDto extends CreateUserDto {

  @ApiProperty({ example: 'Egor', description: 'The first name of the buyer.' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Dou', description: 'The last name of the buyer.' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: '+380995678900', description: 'The phone number of the buyer.' })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
  readonly file?: Express.Multer.File;
}
