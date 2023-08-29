import { BuyerEntity } from '@app/buyer/buyer.entity';

export type UserType = Omit<BuyerEntity, 'hashPassword'>;
