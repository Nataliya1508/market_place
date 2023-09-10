import { UserEntity } from '@app/user/entities/user.entity';

export type UserType<T> = Omit<T & UserEntity, 'hashPassword'>;
