import { PaginationRequestDto } from '@core/dtos/pagination.request.dto';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class ListTriviaDTO extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
  
  @IsOptional()
  @IsUUID('4')
  userId?: string;
}
