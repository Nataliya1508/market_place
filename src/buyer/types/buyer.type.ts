import { UserRole } from '@app/user/enums/userRole.enum';

export type Buyer = {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  email: string;
  password: string;
  role: UserRole;
  emailVerified: boolean;
};
