import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QUESTION_SERVICE_TOKEN } from './service/question.service.interface';
import { PrismaService } from '@src/prisma/prisma.service';
import { QUESTION_LEVEL_REPOSITORY_TOKEN } from './repository/question-level.repository.interface';
import { QuestionLevelRepository } from './repository/question-level.repository';
import { QuestionRepository } from './repository/question.repository';
import { QUESTION_REPOSITORY_TOKEN } from './repository/question.repository.interface';

@Module({
  providers: [
    PrismaService,
    {
      provide: QUESTION_LEVEL_REPOSITORY_TOKEN,
      useClass: QuestionLevelRepository,
    },
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
    {
      provide: QUESTION_SERVICE_TOKEN,
      useClass: QuestionService,
    },
  ],
  controllers: [QuestionController],
  exports: [QUESTION_SERVICE_TOKEN],
})
export class QuestionModule {}
