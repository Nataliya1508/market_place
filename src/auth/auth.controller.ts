import { BuyerService } from '@app/buyer/buyer.service';
import { BuyerResponseInterface } from '@app/buyer/types/buyerResponce.interface';
import { CreateSellerDto } from '@app/saler/dto/create-seller.dto';
import { SellerService } from '@app/saler/seller.service';
import { SellerResponseInterface } from '@app/saler/types/sellerResponse.interface';
import { UserResponseInterface } from '@app/user/types/userResponce.interface';
import { UserService } from '@app/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBuyerDto } from 'src/buyer/dto/create-buyer.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly buyerService: BuyerService,
    private readonly sellerService: SellerService,
    private readonly userService: UserService,
  ) {}
  @Post('/register/buyer')
  async registerBuyer(
    @Body('buyer') createBuyerDto: CreateBuyerDto,
  ): Promise<BuyerResponseInterface> {
    const buyer = await this.authService.createBuyer(createBuyerDto);
    return this.buyerService.buildBuyerResponse(buyer);
  }

  @Post('/register/seller')
  async registerSeller(
    @Body('seller') createSellerDto: CreateSellerDto,
  ): Promise<SellerResponseInterface> {
    const seller = await this.authService.createSeller(createSellerDto);
    return this.sellerService.buildSellerResponse(seller);
  }

  @Post('/login')
    async login(
    @Body('users') userLoginDto: UserLoginDto,
  ): Promise<BuyerResponseInterface | SellerResponseInterface> {
    return await this.authService.login(userLoginDto);
// const user = await this.authService.login(userLoginDto);
// console.log("user", user)
//   return user;
  }

}
