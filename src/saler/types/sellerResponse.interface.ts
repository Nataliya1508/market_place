import { SellerType } from "./seller.type";

export interface SellerResponseInterface {
  seller: SellerType & { token: string };
}