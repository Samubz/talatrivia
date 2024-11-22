import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationRequestDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;
}
