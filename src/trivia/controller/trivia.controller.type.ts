import { QuestionControllerType } from "@src/question/controller/question.controller.type";
import { TriviaDomain } from "../domain/trivia.domain";

export type TriviaControllerType = Omit<TriviaDomain, 'questions'> & {
  questions: QuestionControllerType[];
};