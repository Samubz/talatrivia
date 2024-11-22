import { PaginationRequestDto } from '@core/dtos/pagination.request.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListTriviaDTO extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
