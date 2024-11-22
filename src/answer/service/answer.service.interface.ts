import { AnswerDomain } from '../domain/answer.domain';
import { CreateAnswerDto } from '../dto/create-answer.dto';

export interface IAnswerService {
  create(
    data: CreateAnswerDto,
    userId: string
  ): Promise<AnswerDomain | null>;
}

export const ANSWER_SERVICE_TOKEN = 'ANSWER_SERVICE';
