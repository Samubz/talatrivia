import { QuestionDomain } from "@src/question/domain/question.domain";

export class TriviaDomain {
  id: string;
  name: string;
  description?: string;
  questions: QuestionDomain[];
}

export class RankingDomain {
  userId: string;
  name?: string;
  totalScore: number;
}