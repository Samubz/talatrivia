import { LevelDomain } from "../domain/level.domain";
import { QuestionLevelDomain } from "../domain/question-level.domain";

export interface IQuestionLevelRepository {
  getByDifficulty(difficulty: LevelDomain): Promise<QuestionLevelDomain | null>;
}


export const QUESTION_LEVEL_REPOSITORY_TOKEN = 'QUESTION_LEVEL_REPOSITORY';