import { BuyerType } from './buyer.type';

export interface BuyerResponseInterface {
  buyer: BuyerType & { token: string };
}