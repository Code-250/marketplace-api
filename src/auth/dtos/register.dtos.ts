import { IsEnum, IsString } from 'class-validator';
import { LoginDtos } from './login.dtos';

export enum SellerOrCustomer {
  SELLER = 'SELLER',
  BUYER = 'BUYER',
}
export enum EStatus {
  NEW = 'NEW',
  VERIFIED = 'VERIFIED',
}
export class RegisterDTO extends LoginDtos {
  @IsString()
  name: string;
  @IsString()
  username: string;

  @IsEnum(SellerOrCustomer)
  role: SellerOrCustomer;

  status?: EStatus;
}
