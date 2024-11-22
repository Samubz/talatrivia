import { Prisma, Trivia, QuestionOnTrivia } from '@prisma/client';

export type GetQuestionTriviaResponse = QuestionOnTrivia &
  Prisma.QuestionOnTriviaGetPayload<{
    include: {
      question: {
        include: {
          options: true;
          level: true;
        };
      };
    };
  }>;

export type GetTriviaByIdResponse = Trivia &
  Prisma.TriviaGetPayload<{
    include: {
      questions: {
        include: {
          question: {
            include: {
              options: true;
              level: true;
            };
          };
        };
      };
      users: true;
    };
  }>;

export interface IListTriviaParams {
  name?: string;
  page?: number;
  limit?: number;
}
