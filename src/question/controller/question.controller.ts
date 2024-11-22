import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  IQuestionService,
  QUESTION_SERVICE_TOKEN,
} from '../service/question.service.interface';
import { Permissions } from '@core/decorators/permissions.decorator';
import { PermissionsMap } from '@src/auth/domain/permission.domain';
import { CreateQuestionDto } from '../dto/create-question.dto';
import {
  OptionControllerType,
  QuestionControllerType,
} from './question.controller.type';
import { QuestionDomain } from '../domain/question.domain';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { OptionDomain } from '../domain/option.domain';
import { ProfileTypeDomain } from '@src/user/domain/role.domain';
import { profileIsAdmin } from '@core/utils/is-admin.util';
import { ISession } from '@src/auth/domain/token-payload.domain';
import { ExpressRequest } from '@core/types/express-session';

@Controller('questions')
export class QuestionController {
  constructor(
    @Inject(QUESTION_SERVICE_TOKEN)
    private readonly questionService: IQuestionService,
  ) {}

  @Permissions(PermissionsMap.CREATE_QUESTION)
  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() request: ExpressRequest,
  ): Promise<QuestionControllerType | null> {
    const session: ISession = request?.session;
    const { profile } = session;
    const user = await this.questionService.create(createQuestionDto);
    return this.toController(user, profile);
  }

  @Permissions(PermissionsMap.LIST_QUESTIONS)
  @Get()
  async get(
    @Query() listQuestionsDto: ListQuestionsDTO,
    @Request() request: ExpressRequest,
  ): Promise<PaginationResponse> {
    const session: ISession = request?.session;
    const { profile } = session;
    const paginationResponse =
      await this.questionService.list(listQuestionsDto);
    const { questions: questionsResponse, ...rest } = paginationResponse;
    const questions = (questionsResponse as QuestionDomain[]).map((question) =>
      this.toController(question, profile),
    ) as QuestionControllerType[];
    return {
      questions,
      ...rest,
    };
  }
  private questionToController(
    option: OptionDomain,
    profile: ProfileTypeDomain,
  ): OptionDomain | OptionControllerType {
    return {
      id: option.id,
      title: option.title,
      ...(profileIsAdmin(profile) && { valid: option.valid }),
    };
  }
  private toController(
    domainElement: QuestionDomain | null,
    profile: ProfileTypeDomain,
  ): QuestionControllerType | null {
    if (!domainElement) return null;
    return {
      id: domainElement.id,
      title: domainElement.title,
      level: domainElement.level,
      options: domainElement.options.map((option) =>
        this.questionToController(option, profile),
      ),
    };
  }
}
