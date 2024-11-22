import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Permissions } from '@core/decorators/permissions.decorator';
import { PermissionsMap } from '@src/auth/domain/permission.domain';
import { CreateTriviaDto } from '../dto/create-trivia.dto';
import {
  ITriviaService,
  TRIVIA_SERVICE_TOKEN,
} from '../service/trivia.service.interface';
import { validateErrors } from '@core/utils/http-error-response.util';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { TriviaDomain } from '../domain/trivia.domain';
import { TriviaControllerType } from './trivia.controller.type';
import { QuestionController } from '@src/question/controller/question.controller';
import { ProfileTypeDomain } from '@src/user/domain/role.domain';
import { ExpressRequest } from '@core/types/express-session';
import { ISession } from '@src/auth/domain/token-payload.domain';
import { QuestionControllerType } from '@src/question/controller/question.controller.type';
import { ListTriviaDTO } from '../dto/list-trivia.dto';
import { PromiseResponse } from '@core/types/promise';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';

@Controller('trivia')
export class TriviaController {
  constructor(
    @Inject(TRIVIA_SERVICE_TOKEN)
    private readonly triviaService: ITriviaService,
  ) {}

  @Permissions(PermissionsMap.CREATE_TRIVIA)
  @Post()
  async create(
    @Body() createTriviaDto: CreateTriviaDto,
    @Request() request: ExpressRequest,
  ): Promise<any | null> {
    try {
      const session: ISession = request?.session;
      const { profile } = session;
      const trivia = await this.triviaService.create(createTriviaDto);
      return this.toController(trivia, profile);
    } catch (error) {
      validateErrors(error, TriviaController.name, ResponseErrorMessage);
    }
  }
  @Permissions(PermissionsMap.LIST_TRIVIA_USER)
  @Get('/user')
  async getByUser(
    @Query() listTriviaDto: ListTriviaDTO,
    @Request() request: ExpressRequest,
  ): PromiseResponse<PaginationResponse> {
    try {
      const session: ISession = request?.session;
      const { profile, id } = session;
      const paginationResponse = await this.triviaService.list({
        ...listTriviaDto,
        userId: id,
      });
      const { trivia: triviaResponse, ...rest } = paginationResponse;
      const users = (triviaResponse as TriviaDomain[]).map((trivia) =>
        this.toController(trivia, profile),
      ) as TriviaControllerType[];
      return {
        users,
        ...rest,
      };
    } catch (error) {
      validateErrors(error, TriviaController.name, ResponseErrorMessage);
    }
  }
  @Permissions(PermissionsMap.LIST_TRIVIA_USER)
  @Get(':triviaId/ranking')
  async getRanking(
    @Param('triviaId') triviaId: string
  ): PromiseResponse<PaginationResponse> {
    try {
     return this.triviaService.getRanking(triviaId);
    } catch (error) {
      validateErrors(error, TriviaController.name, ResponseErrorMessage);
    }
  }

  @Permissions(PermissionsMap.LIST_TRIVIA)
  @Get()
  async get(
    @Query() listTriviaDto: ListTriviaDTO,
    @Request() request: ExpressRequest,
  ): PromiseResponse<PaginationResponse> {
    try {
      const session: ISession = request?.session;
      const { profile } = session;
      const paginationResponse = await this.triviaService.list(listTriviaDto);
      const { trivia: triviaResponse, ...rest } = paginationResponse;
      const users = (triviaResponse as TriviaDomain[]).map((trivia) =>
        this.toController(trivia, profile),
      ) as TriviaControllerType[];
      return {
        users,
        ...rest,
      };
    } catch (error) {
      validateErrors(error, TriviaController.name, ResponseErrorMessage);
    }
  }

  private toController(
    domainElement: TriviaDomain | null,
    profile: ProfileTypeDomain,
  ): TriviaControllerType | null {
    if (!domainElement) return null;
    const { id, name, description, questions } = domainElement;
    return {
      id,
      name,
      description,
      questions: questions
        .map((question) => QuestionController.toController(question, profile))
        .filter(Boolean) as QuestionControllerType[],
    };
  }
}
