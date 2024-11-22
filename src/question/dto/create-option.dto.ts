import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @MaxLength(100)
  title: string;
  
  @IsBoolean()
  valid: boolean;
}
