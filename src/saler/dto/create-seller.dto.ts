import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateSellerDto extends CreateUserDto {

  @ApiProperty({ example: 'Egor', description: 'The first name of the seller.' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Dou', description: 'The last name of the seller.' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: '+380995678900', description: 'The phone number of the seller.' })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ example: 'FRUIT Company', description: 'The name of the company.' })
  @IsNotEmpty()
  readonly companyName: string;



  @ApiProperty({ example: 'Saksaganskogo, 121', description: 'The address of the company.' })
  @IsNotEmpty()
  readonly address: string;

        @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    readonly file?: Express.Multer.File;


  
}
