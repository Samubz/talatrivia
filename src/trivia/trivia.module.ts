import { Module } from '@nestjs/common';
import { TriviaService } from './service/trivia.service';
import { TriviaController } from './controller/trivia.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { TRIVIA_REPOSITORY_TOKEN } from './repository/trivia.repository.interface';
import { TriviaRepository } from './repository/trivia.repository';
import { TRIVIA_SERVICE_TOKEN } from './service/trivia.service.interface';
import { UserModule } from '@src/user/user.module';
import { QuestionModule } from '@src/question/question.module';

@Module({
  providers: [
    PrismaService,
    {
      provide: TRIVIA_REPOSITORY_TOKEN,
      useClass: TriviaRepository,
    },
    {
      provide: TRIVIA_SERVICE_TOKEN,
      useClass: TriviaService,
    },
  ],
  imports: [UserModule, QuestionModule],
  controllers: [TriviaController],
  exports: [TRIVIA_SERVICE_TOKEN],
})
export class TriviaModule {}
