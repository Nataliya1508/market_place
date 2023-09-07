import { UserRole } from '@app/user/enums/userRole.enum';

export type User = {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  emailVerified: boolean;
};
