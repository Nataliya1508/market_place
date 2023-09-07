type BaseSeller = {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export type CreateIndividualSeller = {
  image?: string | null;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  bankCardNumber: string;
  bankCardExpirationDate: string;
} & Omit<BaseSeller, 'id'>;

export type CreateCompanySeller = {
  companyName: string;
  image: string;
  logo?: string | null;
  about: string;
  contactPersonFullName: string;
  address: string;
  workingHours: string;
  iban?: string | null;
  bankName?: string | null;
  mfo?: string | null;
  edrpou?: string | null;
} & Omit<BaseSeller, 'id'>;
