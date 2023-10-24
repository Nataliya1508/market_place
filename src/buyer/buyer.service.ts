import { Role } from '@app/user/enums/enums';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { BuyerEntity } from './entities/buyer.entity';
import { BuyerResponseInterface } from './types/buyerResponce.interface';

@Injectable()
export class BuyerService {
  generateJwt(buyer: BuyerEntity): string {
    return sign(
      {
        id: buyer.id,
        role: Role.Buyer,
        // email: buyer.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildBuyerResponse(buyer: BuyerEntity): BuyerResponseInterface {
    return {
      buyer: {
        ...buyer,
        token: this.generateJwt(buyer),
      },
    };
  }
}
