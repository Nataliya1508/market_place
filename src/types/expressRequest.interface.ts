import { UserEntity } from '@app/user/entities/user.entity';
import { Request } from 'express';

export type ExpressRequestInterfase = Request & {
  user?: UserEntity;
};
