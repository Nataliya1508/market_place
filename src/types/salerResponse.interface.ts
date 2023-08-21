import { SalerType } from './saler.type';

export interface SalerResponseInterface {
  saler: SalerType & { token: string };
}
