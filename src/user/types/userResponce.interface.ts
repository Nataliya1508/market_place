import { BuyerType } from '@app/buyer/types/buyer.type';
import { SellerType } from '@app/saler/types/seller.type';

export interface UserResponseInterface {
  user: BuyerType | SellerType;
  token: string;
}
