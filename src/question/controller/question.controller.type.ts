import { OptionDomain } from "../domain/option.domain";
import { QuestionDomain } from "../domain/question.domain";


export type OptionControllerType = Omit<OptionDomain, 'valid'>;
export type QuestionControllerType = Omit<QuestionDomain,'options'> & {
  options: OptionControllerType[];
};