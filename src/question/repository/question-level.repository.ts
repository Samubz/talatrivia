import { PrismaService } from '@src/prisma/prisma.service';
import { IQuestionLevelRepository } from './question-level.repository.interface';
import { LevelDomain } from '../domain/level.domain';
import { CONDITIONAL_EXIST } from '@core/constants/where-prisma.constants';
import { QuestionLevel } from '@prisma/client';
import { QuestionLevelDomain } from '../domain/question-level.domain';
import { Injectable } from '@nestjs/common';
@Injectable()
export class QuestionLevelRepository implements IQuestionLevelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByDifficulty(
    difficulty: LevelDomain,
  ): Promise<QuestionLevelDomain | null> {
    const questionLevel = await this.prisma.questionLevel.findFirst({
      where: {
        difficulty,
        ...CONDITIONAL_EXIST,
      },
    });
    return this.toDomain(questionLevel);
  }

  private toDomain(
    prismaElement: QuestionLevel | null,
  ): QuestionLevelDomain | null {
    if (!prismaElement) return null;
    return {
      id: prismaElement.id,
      score: prismaElement.score,
      difficulty: prismaElement.difficulty,
    };
  }
}
