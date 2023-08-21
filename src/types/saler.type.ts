import { SalerEntity } from '@app/saler/saler.entity';

export type SalerType = Omit<SalerEntity, 'hashPassword'>;
