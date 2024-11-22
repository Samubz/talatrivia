import { QuestionDomain } from "@src/question/domain/question.domain";

export class TriviaDomain {
  id: string;
  name: string;
  description?: string;
  questions: QuestionDomain[];
}