import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@core/config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@core/guards/auth.guard';
import { PermissionGuard } from '@core/guards/permission.guard';
import { QuestionModule } from './question/question.module';
import { TriviaModule } from './trivia/trivia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    AuthModule,
    UserModule,
    QuestionModule,
    TriviaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
