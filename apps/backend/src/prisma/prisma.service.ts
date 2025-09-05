import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_ERROR } from './consts';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }

  catchError(error) {
    return {
      error: { code: (error?.code as string) || PRISMA_ERROR.DEFAULT.code },
    };
  }
}
