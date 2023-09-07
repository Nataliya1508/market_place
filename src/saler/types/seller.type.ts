import { UserRole } from '@app/user/enums/userRole.enum';

export type Seller = {
  id: number;
  name: string;
  role: UserRole;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  isActive: boolean;
};

export type IndividualSeller = {
  image: string | null;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  bankCardNumber: string;
  bankCardExpirationDate: string;
} & Seller;

export type CompanySeller = {
  companyName: string;
  image: string;
  logo: string | null;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  iban: string | null;
  bankName: string | null;
  mfo: string | null;
  edrpou: string | null;
} & Seller;
