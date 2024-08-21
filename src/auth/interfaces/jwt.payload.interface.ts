export enum ERole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export interface JWTPayload {
  id: number;
  role: ERole;
}
