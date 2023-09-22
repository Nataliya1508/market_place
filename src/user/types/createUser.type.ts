import { Role } from '../enums/enums';

export type CreateUser = {
  email: string;
  password: string;
  role?: Role;
  emailVerified?: boolean;
};
