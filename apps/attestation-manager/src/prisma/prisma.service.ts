import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public constructor(private configService: ConfigService) {
    super();
  }

  public async onModuleInit() {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: this.configService.get('DATABASE_URL'),
        },
      },
    });
    await prisma.$connect();
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}
