import { Inject, Injectable } from '@nestjs/common';
import { ITriviaService } from './trivia.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@src/user/repository/user.repository.interface';
import {
  ITriviaRepository,
  TRIVIA_REPOSITORY_TOKEN,
} from '../repository/trivia.repository.interface';
import {
  IQuestionRepository,
  QUESTION_REPOSITORY_TOKEN,
} from '@src/question/repository/question.repository.interface';
import { TriviaDomain } from '../domain/trivia.domain';
import { CreateTriviaDto } from '../dto/create-trivia.dto';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { ListTriviaDTO } from '../dto/list-trivia.dto';

@Injectable()
export class TriviaService implements ITriviaService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(TRIVIA_REPOSITORY_TOKEN)
    private readonly triviaRepository: ITriviaRepository,

    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}
  async create(data: CreateTriviaDto): Promise<TriviaDomain | null> {
    const { questions, users } = data;

    const validQuestions =
      await this.questionRepository.validateQuestionIds(questions);
    if (!validQuestions) {
      throw new Error(ResponseErrorMessage.INVALID_QUESTIONS_IDS);
    }

    const validUsers = await this.userRepository.validateUserIds(users);
    if (!validUsers) {
      throw new Error(ResponseErrorMessage.INVALID_USERS_IDS);
    }
    return this.triviaRepository.create(data);
  }

  async list(listTriviaDto:ListTriviaDTO) {
    return this.triviaRepository.list(listTriviaDto);
  }
}
