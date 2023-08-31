import { BuyerEntity } from '@app/buyer/buyer.entity';
import { Request } from 'express';

export type ExpressRequestInterfase = Request & {
  user?: BuyerEntity;
};
