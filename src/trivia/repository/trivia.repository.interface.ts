import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { TriviaDomain } from '../domain/trivia.domain';
import { CreateTriviaDto } from '../dto/create-trivia.dto';
import { ListTriviaDTO } from '../dto/list-trivia.dto';

export interface ITriviaRepository {
  create(data: CreateTriviaDto): Promise<TriviaDomain | null>;
  list(listTriviaDto: ListTriviaDTO): Promise<PaginationResponse>;
  hasQuestion(triviaId: string, questionId: string): Promise<boolean>;
  hasUserAssigned(triviaId: string, userId: string): Promise<boolean>;
}

export const TRIVIA_REPOSITORY_TOKEN = 'TRIVIA_REPOSITORY';
