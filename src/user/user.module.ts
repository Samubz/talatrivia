import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { USER_REPOSITORY_TOKEN } from './repository/user.repository.interface';
import { USER_SERVICE_TOKEN } from './service/user.service.interface';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepository,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
  exports: [USER_SERVICE_TOKEN],
})
export class UserModule {}