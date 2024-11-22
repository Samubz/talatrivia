import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { QuestionDomain } from '../domain/question.domain';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { ListQuestionsDTO } from '../dto/list-questions.dto';
import { QuestionLevelDomain } from '../domain/question-level.domain'; 

export interface IQuestionRepository {
  create(
    data: CreateQuestionDto,
    questionLevel: QuestionLevelDomain,
  ): Promise<QuestionDomain | null>;
  list(listQuestionsDto: ListQuestionsDTO): Promise<PaginationResponse>;
  validateQuestionIds(ids: string[]): Promise<boolean>;
  get(id: string): Promise<QuestionDomain | null>;
}

export const QUESTION_REPOSITORY_TOKEN = 'QUESTION_REPOSITORY';
