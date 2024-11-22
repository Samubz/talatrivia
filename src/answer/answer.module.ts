import { Module } from '@nestjs/common';
import { AnswerController } from './controller/answer.controller';
import { AnswerService } from './service/answer.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { ANSWER_REPOSITORY_TOKEN } from './repository/answer.repository.interface';
import { AnswerRepository } from './repository/answer.repository';
import { ANSWER_SERVICE_TOKEN } from './service/answer.service.interface';
import { TriviaModule } from '@src/trivia/trivia.module';
import { QuestionModule } from '@src/question/question.module';

@Module({
  controllers: [AnswerController],
  providers: [
    PrismaService,
    {
      provide: ANSWER_REPOSITORY_TOKEN,
      useClass: AnswerRepository,
    },
    {
      provide: ANSWER_SERVICE_TOKEN,
      useClass: AnswerService,
    },
  ],
  imports: [TriviaModule, QuestionModule],
})
export class AnswerModule {}
