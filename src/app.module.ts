import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from './prisma-client/prisma-client';

@Module({
  imports: [AuthModule],
  providers: [PrismaClient],
})
export class AppModule {}
