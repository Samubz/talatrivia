
import { PaginationResponse } from "@core/interfaces/pagination-response.interface";
import { QuestionDomain } from "../domain/question.domain";
import { CreateQuestionDto } from "../dto/create-question.dto"; 
import { ListQuestionsDTO } from "../dto/list-questions.dto";

export interface IQuestionService {
  create(data: CreateQuestionDto): Promise<QuestionDomain | null>;
  list(listQuestionsDto: ListQuestionsDTO): Promise<PaginationResponse>;
}


export const QUESTION_SERVICE_TOKEN = 'QUESTION_SERVICE';