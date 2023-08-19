import { UserEntity } from '@app/user/user.entity';
import { Request } from 'express';

export interface ExpressRequestInterfase extends Request {
  user?: UserEntity;
}
