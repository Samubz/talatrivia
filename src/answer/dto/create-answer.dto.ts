import { IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @IsUUID('4')
  questionId: string;
  @IsUUID('4')
  optionId: string;
  @IsUUID('4')
  triviaId: string;
}
