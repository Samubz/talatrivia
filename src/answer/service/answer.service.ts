import { Inject, Injectable } from '@nestjs/common';
import { IAnswerService } from './answer.service.interface';
import {
  ANSWER_REPOSITORY_TOKEN,
  IAnswerRepository,
} from '../repository/answer.repository.interface';
import { AnswerDomain } from '../domain/answer.domain';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import {
  ITriviaRepository,
  TRIVIA_REPOSITORY_TOKEN,
} from '@src/trivia/repository/trivia.repository.interface';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import {
  IQuestionRepository,
  QUESTION_REPOSITORY_TOKEN,
} from '@src/question/repository/question.repository.interface';

@Injectable()
export class AnswerService implements IAnswerService {
  constructor(
    @Inject(ANSWER_REPOSITORY_TOKEN)
    private readonly answerRepository: IAnswerRepository,
    @Inject(TRIVIA_REPOSITORY_TOKEN)
    private readonly triviaRepository: ITriviaRepository,
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async create(
    data: CreateAnswerDto,
    userId: string,
  ): Promise<AnswerDomain | null> {
    const { questionId, triviaId, optionId } = data;
    const hasQuestion = await this.triviaRepository.hasQuestion(
      triviaId,
      questionId,
    );
    if (!hasQuestion) {
      throw new Error(ResponseErrorMessage.TRIVIA_QUESTION_ERROR);
    }
    const trivia = await this.triviaRepository.hasUserAssigned(
      triviaId,
      userId,
    );
    if (!trivia) {
      throw new Error(ResponseErrorMessage.TRIVIA_USER_ERROR);
    }
    const question = await this.questionRepository.get(questionId);
    if (!question) {
      throw new Error(ResponseErrorMessage.QUESTION_NOT_FOUND);
    }
    const wasAnswered = await this.answerRepository.wasAnswered(
      triviaId,
      questionId,
      userId,
    );
    if (wasAnswered) {
      throw new Error(ResponseErrorMessage.QUESTION_ALREADY_HAVE_ANSWER);
    }
    const selectedOption = question.options.find(
      (option) => option.id === optionId,
    );
    if (!selectedOption) {
      throw new Error(ResponseErrorMessage.OPTION_NOT_FOUND);
    }
    const wasValid = selectedOption.valid;
    const score = wasValid ? question.level.score : 0; 
    return this.answerRepository.create(data, userId, wasValid, score);
  }
}
