import { UserRole } from '@app/user/enums/userRole.enum';

export type CreateUser = {
  email: string;
  password: string;
  role?: UserRole;
  emailVerified?: boolean;
};
