import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { QuestionDomain } from '../domain/question.domain';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { ListQuestionsDTO } from '../dto/list-questions.dto';

export interface IQuestionRepository {
  create(data: CreateQuestionDto): Promise<QuestionDomain | null>;
  list(listQuestionsDto: ListQuestionsDTO): Promise<PaginationResponse>;
}

export const QUESTION_REPOSITORY_TOKEN = 'QUESTION_REPOSITORY';