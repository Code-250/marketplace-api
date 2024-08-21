import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { IConstants } from "src/__shared__/interface/IConstants";
import { AuthService } from "./auth.service";

@Global();
@Module({
  imports:[PassportModule, JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async(configService: ConfigService<IConstants>)=>({
      secret: configService.get("jwt").secret,
      signOptions: {
        expiresIn:configService.get("jwt").expiresIn,
        issuer:"Market place API"
      }
    }),
    inject:[ConfigService]
  })],
  providers:[ AuthService, ConfigService],
  exports:[JwtModule, AuthService]
})
export class AuthModule{}