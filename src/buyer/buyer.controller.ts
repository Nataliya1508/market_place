import { BuyerResponseInterface } from '@app/types/userResponse.interface';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '../user/decorators/user.decorator';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { BuyerEntity } from './buyer.entity';
import { BuyerService } from './buyer.service';
import { UpdateBuyerDto } from './dto/updateUser.dto';

@Controller('buyers')
@ApiTags('Buyers')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
  @ApiOperation({ summary: 'Create buyer' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: BuyerEntity })
  @Post()
  async createUser(
    @Body('buyer') createBuyerDto: CreateUserDto,
  ): Promise<BuyerResponseInterface> {
    const buyer = await this.buyerService.createBuyer(createBuyerDto);

    return await this.buyerService.buildBuyerResponse(buyer);
  }

  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: BuyerEntity })
  @Post('login')
  async login(
    @Body('buyer') loginBuyerDto: LoginUserDto,
  ): Promise<BuyerResponseInterface> {
    const buyer = await this.buyerService.login(loginBuyerDto);

    return await this.buyerService.buildBuyerResponse(buyer);
  }

  @ApiParam({ name: 'id', description: 'Buyer ID' })
  @ApiOperation({ summary: 'Carrent buyer' })
  @ApiResponse({ status: 200, type: BuyerEntity })
  @Get('buyer')
  @UseGuards(AuthGuard)
  async carrentUser(
    @User() buyer: BuyerEntity,
  ): Promise<BuyerResponseInterface> {
    return this.buyerService.buildBuyerResponse(buyer);
  }
  @ApiOperation({ summary: 'Update buyer' })
  @ApiResponse({
    status: 200,
    description: 'Buyer updated successfully',
    type: BuyerEntity,
  })
  @Put('buyer')
  @UseGuards(AuthGuard)
  async updateCurrentBuyer(
    @User('id') currentBuyerId: number,
    @Body('user') updateBuyerDto: UpdateBuyerDto,
  ): Promise<BuyerResponseInterface> {
    const buyer = await this.buyerService.updateBuyer(
      currentBuyerId,
      updateBuyerDto,
    );

    return this.buyerService.buildBuyerResponse(buyer);
  }
}
