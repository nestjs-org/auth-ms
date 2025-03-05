import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PriClient } from "@prisma/client";
@Injectable()
export class PrismaClient extends PriClient implements OnModuleInit {
   async onModuleInit() {
        await this.$connect()
    }
}
