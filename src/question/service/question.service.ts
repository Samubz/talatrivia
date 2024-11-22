import { Inject, Injectable } from '@nestjs/common';
import { IQuestionService } from './question.service.interface';
import {
  IQuestionRepository,
  QUESTION_REPOSITORY_TOKEN,
} from '../repository/question.repository.interface';
import { QuestionDomain } from '../domain/question.domain';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import {
  IQuestionLevelRepository,
  QUESTION_LEVEL_REPOSITORY_TOKEN,
} from '../repository/question-level.repository.interface';
import { ResponseErrorMessage } from '../constants/response-message.constants';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,

    @Inject(QUESTION_LEVEL_REPOSITORY_TOKEN)
    private readonly questionLevelRepository: IQuestionLevelRepository,
  ) {}
  async create(data: CreateQuestionDto): Promise<QuestionDomain | null> {
    const { level } = data;
    const questionLevel =
      await this.questionLevelRepository.getByDifficulty(level);
    if (!questionLevel) {
      throw new Error(ResponseErrorMessage.QUESTION_LEVEL_NOT_FOUND);
    }
    return this.questionRepository.create(data, questionLevel);
  }
  list(listQuestions: ListQuestionsDTO): Promise<PaginationResponse> {
    return this.questionRepository.list(listQuestions);
  }
}
