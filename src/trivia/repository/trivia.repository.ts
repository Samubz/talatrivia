import {
  PrismaService,
  PrismaTransactionClient,
} from '@src/prisma/prisma.service';
import { ITriviaRepository } from './trivia.repository.interface';
import { RankingDomain, TriviaDomain } from '../domain/trivia.domain';
import { CreateTriviaDto } from '../dto/create-trivia.dto';
import { Injectable } from '@nestjs/common';
import {
  GetQuestionTriviaResponse,
  GetTriviaByIdResponse,
  IListTriviaParams,
} from './trivia.repository.type';
import { QuestionDomain } from '@src/question/domain/question.domain';
import { OptionDomain } from '@src/question/domain/option.domain';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { ListTriviaDTO } from '../dto/list-trivia.dto';
import { Prisma } from '@prisma/client';
import { CONDITIONAL_EXIST } from '@core/constants/where-prisma.constants';
import { createInsensitiveSearch } from '@core/utils/create-insensitive-search.util';
import { getPrevNextPagination } from '@core/utils/pagination-prev-next-response.util';
@Injectable()
export class TriviaRepository implements ITriviaRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateTriviaDto): Promise<TriviaDomain | null> {
    const { name, description, questions, users } = data;

    const result = await this.prisma.$transaction(
      async (transaction: PrismaTransactionClient) => {
        const createdTrivia = await transaction.trivia.create({
          data: {
            name,
            description,
          },
        });
        const { id: triviaId } = createdTrivia;
        await transaction.questionOnTrivia.createMany({
          data: questions.map((question) => ({
            questionId: question,
            triviaId,
          })),
        });

        await transaction.usersOnTrivia.createMany({
          data: users.map((user) => ({
            userId: user,
            triviaId,
          })),
        });
        return createdTrivia;
      },
    );
    const fullTrivia = await this.prisma.trivia.findUnique({
      where: { id: result.id },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: true,
                level: true,
              },
            },
          },
        },
        users: true,
      },
    });

    return this.toDomain(fullTrivia);
  }

  async list(listTriviaDto: ListTriviaDTO): Promise<PaginationResponse> {
    const whereAndPagination =
      this.getWhereAndPaginationListTrivia(listTriviaDto);

    const [triviaResponse, totalElements] = await Promise.all([
      this.prisma.trivia.findMany({
        ...whereAndPagination,
        include: {
          questions: {
            include: {
              question: {
                include: {
                  options: true,
                  level: true,
                },
              },
            },
          },
          users: true,
        },
      }),
      this.prisma.trivia.count({ where: whereAndPagination.where }),
    ]);

    const trivia = triviaResponse.map((trivia) =>
      this.toDomain(trivia),
    ) as TriviaDomain[];

    if (
      !whereAndPagination.take ||
      whereAndPagination.skip === undefined ||
      whereAndPagination.skip === null
    ) {
      return {
        trivia,
        totalElements,
        nextPage: null,
        prevPage: null,
      };
    }
    const { nextPage, prevPage } = getPrevNextPagination(
      whereAndPagination?.skip,
      whereAndPagination?.take,
      totalElements,
    );

    return {
      trivia,
      totalElements,
      nextPage,
      prevPage,
    };
  }

  async hasQuestion(triviaId: string, questionId: string): Promise<boolean> {
    const questionOnTrivia = await this.prisma.questionOnTrivia.findFirst({
      where: {
        triviaId,
        questionId,
        ...CONDITIONAL_EXIST,
      },
    });
    return Boolean(questionOnTrivia);
  }

  async hasUserAssigned(triviaId: string, userId: string): Promise<boolean> {
    const userOnTrivia = await this.prisma.usersOnTrivia.findFirst({
      where: {
        triviaId,
        userId,
        ...CONDITIONAL_EXIST,
      },
    });
    return Boolean(userOnTrivia);
  }

  async getRanking(triviaId: string): Promise<RankingDomain[]> {
    const triviaQuestionsCount = await this.prisma.questionOnTrivia.count({
      where: {
        triviaId: triviaId,
      },
    });
    const userAnswers = await this.prisma.answer.groupBy({
      by: ['userId'],
      where: {
        triviaId: triviaId,
      },
      _count: {
        questionId: true,
      },
    }); 
    const completedUsers = userAnswers.filter(
      (user) => user._count.questionId === triviaQuestionsCount
    );
    const ranking = await Promise.all(
      completedUsers.map(async (user) => {
        const totalScore = await this.prisma.answer.aggregate({
          where: {
            userId: user.userId,
            triviaId: triviaId,
          },
          _sum: {
            score: true,
          },
        });
    
        return {
          userId: user.userId,
          totalScore: totalScore._sum.score || 0,
        };
      })
    );
    ranking.sort((a, b) => b.totalScore - a.totalScore);
    return ranking;
  }

  private getWhereAndPaginationListTrivia(params: IListTriviaParams) {
    const { name = '', userId = '', page, limit } = params;

    const skipElements = page && limit ? (page - 1) * limit : undefined;
    const whereInput: Prisma.TriviaWhereInput = {
      ...CONDITIONAL_EXIST,
      ...(name.length && createInsensitiveSearch('name', name)),
      ...(userId && { users: { some: { userId } } }),
    };
    const pagination: Prisma.TriviaFindManyArgs = {
      take: limit,
      skip: skipElements,
      where: whereInput,
      orderBy: {
        name: 'asc',
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: true,
                level: true,
              },
            },
          },
        },
        users: true,
      },
    };

    return pagination;
  }

  private triviaQuestionsToDomain(
    elements: GetQuestionTriviaResponse[],
  ): QuestionDomain[] {
    return elements.map<QuestionDomain>(({ question }) => ({
      id: question.id,
      title: question.title,
      level: question.level,
      options: question.options.map<OptionDomain>((option) => ({
        id: option.id,
        title: option.title,
        valid: option.valid,
      })),
    }));
  }

  private toDomain(
    prismaElement: GetTriviaByIdResponse | null,
  ): TriviaDomain | null {
    if (!prismaElement) return null;
    const { id, name, questions } = prismaElement;
    return {
      id,
      name,
      questions: this.triviaQuestionsToDomain(questions),
    };
  }
}
