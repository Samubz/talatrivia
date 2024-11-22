import { PaginationResponse } from "@core/interfaces/pagination-response.interface";
import { TriviaDomain } from "../domain/trivia.domain";
import { CreateTriviaDto } from "../dto/create-trivia.dto";
import { ListTriviaDTO } from "../dto/list-trivia.dto";

export interface ITriviaService {
  create(data: CreateTriviaDto): Promise<TriviaDomain | null>;
  list(listTriviaDto: ListTriviaDTO): Promise<PaginationResponse>;
  getRanking(triviaId: string): Promise<any>;
}
export const TRIVIA_SERVICE_TOKEN = 'TRIVIA_SERVICE';