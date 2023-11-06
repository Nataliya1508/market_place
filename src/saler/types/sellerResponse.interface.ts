import { SellerType } from './seller.type';

export interface SellerResponseInterface {
  // role: Role;
  seller: SellerType & { token: string };
}
