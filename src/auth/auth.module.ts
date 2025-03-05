import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from 'src/prisma-client/prisma-client';
import {JwtModule} from "@nestjs/jwt";
import { envs } from 'src/config/envs';
@Module({
  imports:[
      JwtModule.register({
        global: true,
        signOptions:{expiresIn: '1h'},
        secret: envs.jwt_secret
      })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaClient],
})
export class AuthModule {
  
}
