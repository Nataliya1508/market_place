import { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

export interface ExpressRequestInterfase extends Request {
  user?: UserEntity;
}
