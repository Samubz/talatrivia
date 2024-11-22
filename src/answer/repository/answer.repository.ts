import { Injectable } from '@nestjs/common';
import { IAnswerRepository } from './answer.repository.interface';
import { AnswerDomain } from '../domain/answer.domain';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Answer } from '@prisma/client';
import { CONDITIONAL_EXIST } from '@core/constants/where-prisma.constants';

@Injectable()
export class AnswerRepository implements IAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateAnswerDto,
    userId: string,
    valid: boolean,
    score: number,
  ): Promise<AnswerDomain | null> {
    const { questionId, optionId, triviaId } = data;
    const answerCreated = await this.prisma.answer.create({
      data: {
        userId,
        questionId,
        optionId,
        triviaId,
        valid,
        score,
      },
    });
    return this.toDomain(answerCreated);
  }

  async wasAnswered(
    triviaId: string,
    questionId: string,
    userId: string,
  ): Promise<boolean> {
    const answer = await this.prisma.answer.findFirst({
      where: {
        ...CONDITIONAL_EXIST,
        triviaId,
        questionId,
        userId,
      },
    });
    return Boolean(answer);
  }
  private toDomain(prismaElement: Answer | null): AnswerDomain | null {
    if (!prismaElement) return null;
    return {
      id: prismaElement.id,
      questionId: prismaElement.questionId,
      triviaId: prismaElement.triviaId,
      optionId: prismaElement.optionId,
      valid: prismaElement.valid,
      score: prismaElement.score,
    };
  }
}
