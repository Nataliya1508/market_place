import { BuyerEntity } from '@app/buyer/entities/buyer.entity';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { ExpressRequestInterfase } from '@app/types/expressRequest.interface';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('Users')
    @Controller('user')
    @ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }
      @ApiOperation({ summary: 'Current User' })
  @ApiResponse({ status: 200, type: [BuyerEntity || SellerEntity] })
  @Get()
  async currentUser(
    @Req() request: ExpressRequestInterfase,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    return await this.userService.currentUser(request.user);
  }
}
