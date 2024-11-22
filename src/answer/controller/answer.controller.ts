import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { Permissions } from '@core/decorators/permissions.decorator';
import { PermissionsMap } from '@src/auth/domain/permission.domain';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { PromiseResponse } from '@core/types/promise';
import { AnswerDomain } from '../domain/answer.domain';
import {
  ANSWER_SERVICE_TOKEN,
  IAnswerService,
} from '../service/answer.service.interface';
import { ExpressRequest } from '@core/types/express-session';
import { ISession } from '@src/auth/domain/token-payload.domain';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { validateErrors } from '@core/utils/http-error-response.util';

@Controller('answers')
export class AnswerController {
  constructor(
    @Inject(ANSWER_SERVICE_TOKEN)
    private readonly answerService: IAnswerService,
  ) {}

  @Permissions(PermissionsMap.ANSWER_TRIVIA)
  @Post()
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Request() request: ExpressRequest,
  ): PromiseResponse<AnswerDomain | null> {
    try {
      const session: ISession = request?.session;
      const { id } = session;
      const answer = await this.answerService.create(createAnswerDto, id);
      return answer;
    } catch (error) { 
      validateErrors(error, AnswerController.name, ResponseErrorMessage);
    }
  }
}
