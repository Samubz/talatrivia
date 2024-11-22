import { PaginationRequestDto } from '@core/dtos/pagination.request.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListQuestionsDTO extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;
}
