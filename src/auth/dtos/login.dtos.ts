import { IsEmail, IsString } from 'class-validator';

export class LoginDtos {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
