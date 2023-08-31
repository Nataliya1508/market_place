import { UserType } from './user.type';

export interface BuyerResponseInterface {
  user: UserType & { token: string };
}
export { UserType };
