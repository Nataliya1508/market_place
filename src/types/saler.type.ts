import { SellerEntity } from '@app/saler/entities/saler.entity';

export type SalerType = Omit<SellerEntity, 'hashPassword'>;
