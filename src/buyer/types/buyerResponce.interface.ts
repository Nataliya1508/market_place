import { BuyerType } from './buyer.type';

export interface BuyerResponseInterface {
  // role: Role;
  buyer: BuyerType & { token: string };
}
