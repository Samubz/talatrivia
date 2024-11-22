import { PrismaService } from '@src/prisma/prisma.service';
import { IQuestionRepository } from './question.repository.interface';
import { QuestionDomain } from '../domain/question.domain';
import { CreateQuestionDto } from '../dto/create-question.dto';
import {
  IQuestionLevelRepository,
  QUESTION_LEVEL_REPOSITORY_TOKEN,
} from './question-level.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import {
  GetQuestionByIdResponse,
  IListQuestionsParams,
} from './question.repository.type';
import { QuestionLevelDomain } from '../domain/question-level.domain';
import { Prisma, Question } from '@prisma/client';
import { CONDITIONAL_EXIST } from '@core/constants/where-prisma.constants';
import { createInsensitiveSearch } from '@core/utils/create-insensitive-search.util';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import { getPrevNextPagination } from '@core/utils/pagination-prev-next-response.util';
@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(QUESTION_LEVEL_REPOSITORY_TOKEN)
    private readonly questionLevelRepository: IQuestionLevelRepository,
  ) {}
  async create(data: CreateQuestionDto): Promise<QuestionDomain | null> {
    const { level, options, ...rest } = data;
    const questionLevel =
      await this.questionLevelRepository.getByDifficulty(level);
    if (!questionLevel) {
      throw new Error(ResponseErrorMessage.QUESTION_LEVEL_NOT_FOUND);
    }
    const createdQuestion = await this.prisma.question.create({
      data: {
        ...rest,
        questionLevelId: questionLevel.id,
        options: {
          createMany: {
            data: options,
          },
        },
      },
    });
    const fullCreatedQuestion = await this.prisma.question.findUnique({
      where: { id: createdQuestion.id },
      include: {
        level: true,
        options: true,
      },
    });
    return this.toDomain(fullCreatedQuestion);
  }

  async list(listQuestionsDto: ListQuestionsDTO): Promise<PaginationResponse> {
    const whereAndPagination =
      this.getWhereAndPaginationListQuestions(listQuestionsDto);

    const [questionsResponse, totalElements] = await Promise.all([
      this.prisma.question.findMany({ ...whereAndPagination }),
      this.prisma.question.count({ where: whereAndPagination.where }),
    ]);

    const questions = questionsResponse.map((question) =>
      this.toDomain(question as GetQuestionByIdResponse),
    ) as QuestionDomain[];

    if (
      !whereAndPagination.take ||
      whereAndPagination.skip === undefined ||
      whereAndPagination.skip === null
    ) {
      return {
        questions,
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
      questions,
      totalElements,
      nextPage,
      prevPage,
    };
  }

  getWhereAndPaginationListQuestions(params: IListQuestionsParams) {
    const { title = '', page, limit } = params;

    const skipElements = page && limit ? (page - 1) * limit : undefined;

    const whereInput: Prisma.QuestionWhereInput = {
      ...CONDITIONAL_EXIST,
      ...(title.length && createInsensitiveSearch('title', title)),
    };
    const pagination: Prisma.QuestionFindManyArgs = {
      take: limit,
      skip: skipElements,
      where: whereInput,
      orderBy: {
        title: 'asc',
      },
      include: {
        options: true,
        level: true,
      },
    };

    return pagination;
  }

  private toDomain(
    prismaElement: GetQuestionByIdResponse | null,
  ): QuestionDomain | null {
    if (!prismaElement) return null;
    return {
      id: prismaElement.id,
      title: prismaElement.title,
      level: prismaElement.level.difficulty as unknown as QuestionLevelDomain,
      options: prismaElement.options.map((option) => ({
        id: option.id,
        title: option.title,
        valid: option.valid,
      })),
    };
  }
}
