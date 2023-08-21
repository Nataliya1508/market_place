import { SalerResponseInterface } from '@app/types/salerResponse.interface';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/login.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalerEntity } from './saler.entity';
// import { CreateSalerDto } from './dto/createSaler.dto';
import { SalerService } from './saler.service';

@Controller('salers')
export class SalerController {
  constructor(private readonly salerService: SalerService) {}
  @Post('saler')
  @UsePipes(new ValidationPipe())
  async createSaller(
    @Body('saler') createSalerDto: CreateUserDto,
  ): Promise<SalerResponseInterface> {
    const saler = await this.salerService.createSaler(createSalerDto);
    console.log('saler', SalerEntity);
    return this.salerService.buildSalerResponse(saler);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('saler') loginSalerDto: LoginUserDto,
  ): Promise<SalerResponseInterface> {
    const saler = await this.salerService.login(loginSalerDto);
    return await this.salerService.buildSalerResponse(saler);
  }
}
