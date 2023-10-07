import { Role } from '@app/user/enums/enums';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { SellerEntity } from './entities/saler.entity';
import { SellerResponseInterface } from './types/sellerResponse.interface';

@Injectable()
export class SellerService {
  generateJwt(seller: SellerEntity): string {
    return sign(
      {
        id: seller.id,
        role: Role.Seller,
        email: seller.user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildSellerResponse(seller: SellerEntity): SellerResponseInterface {
    return {
      seller: {
        ...seller,
        token: this.generateJwt(seller),
      },
    };
  }
}
