import { OptionDomain } from "./option.domain";
import { QuestionLevelDomain } from "./question-level.domain";

export class QuestionDomain {
  id: string;
  title: string;
  level: QuestionLevelDomain;
  options: OptionDomain[];
}
  