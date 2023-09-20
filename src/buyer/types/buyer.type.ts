import { BuyerEntity } from "../entities/buyer.entity";

export type BuyerType = Omit<BuyerEntity, 'hashPassword'>;