import { BuyerEntity } from '@app/buyer/buyer.entity';
import { Request } from 'express';

export interface ExpressRequestInterfase extends Request {
  user?: BuyerEntity;
}
