import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDTO } from './dtos/register.dtos';
import { AuthUtils } from './utils/auth.utils';
import { ERole } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authUtils: AuthUtils,
  ) {}

  async register(dto: RegisterDTO) {
    const { email, name: fullname, username, role, password, status } = dto;
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists!!');
    }
    const hashedPassword = await this.authUtils.hashPassword(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        username,
        role,
        password: hashedPassword,
      },
    });
    await this.prismaService.userProfile.create({
      data: {
        name: fullname,
      },
    });
    const { refreshToken } = await this.authUtils.generateToken({
      id: newUser.id,
      role: newUser.role as ERole,
    });
    await this.prismaService.user.update({
      where: { id: newUser.id },
      data: { refreshToken },
    });
    return `Check you email ${newUser.email} to verify your account`;
  }
}
