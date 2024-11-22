import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateOptionDto } from './create-option.dto';
import { LevelDomain, LevelMap } from '../domain/level.domain';
import { OnlyOneValidOption } from '@core/validators/only-one-valid-option.validator';

export class CreateQuestionDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsEnum(LevelMap)
  level: LevelDomain;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @OnlyOneValidOption({ message: 'Only one option can have "valid" set to true.' })
  options: CreateOptionDto[];
}
