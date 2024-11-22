import { AnswerDomain } from '../domain/answer.domain';
import { CreateAnswerDto } from '../dto/create-answer.dto';

export interface IAnswerRepository {
  create(
    data: CreateAnswerDto,
    userId: string,
    valid: boolean,
    score: number,
  ): Promise<AnswerDomain | null>;
  wasAnswered(
    triviaId: string,
    questionId: string,
    userId: string,
  ): Promise<boolean>;
}

export const ANSWER_REPOSITORY_TOKEN = 'ANSWER_REPOSITORY';
