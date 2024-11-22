import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTriviaDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  questions: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  users: string[];
}
