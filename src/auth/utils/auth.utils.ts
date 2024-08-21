import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../interfaces/jwt.payload.interface';

export class AuthUtils {
  constructor(private readonly jwtService: JwtService) {}
  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  async generateToken({ id, role }: JWTPayload) {
    const accessToken = this.jwtService.signAsync({ id, role });
    const refreshToken = this.jwtService.signAsync({ id });
    return { accessToken, refreshToken };
  }
}
