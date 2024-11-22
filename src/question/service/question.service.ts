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

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}
  create(data: CreateQuestionDto): Promise<QuestionDomain | null> {
    return this.questionRepository.create(data);
  }
  list(listQuestions: ListQuestionsDTO): Promise<PaginationResponse> {
      return this.questionRepository.list(listQuestions);
  }
}
