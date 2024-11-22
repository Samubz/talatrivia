import { Prisma, Question } from '@prisma/client';

export type GetQuestionByIdResponse = Question &
  Prisma.QuestionGetPayload<{
    include: {
      options: true;
      level: true;
    };
  }>;

export interface IListQuestionsParams {
  title?: string;
  page?: number;
  limit?: number;
}
