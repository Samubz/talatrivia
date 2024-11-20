import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async isConnected() {
    let isConnected = false;
    try {
      await this.$queryRaw`SELECT 1`;
      isConnected = true;
    } catch {}
    return isConnected;
  }
  selectPrismaObject(
    higherPrisma: PrismaClient,
    prismaTransaction?: PrismaTransactionClient,
  ) {
    return prismaTransaction ? prismaTransaction : higherPrisma;
  }
}
