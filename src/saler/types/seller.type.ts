import { SellerEntity } from "../entities/saler.entity";

export type SellerType = Omit<SellerEntity, 'hashPassword'> ;