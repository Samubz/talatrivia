import { IsString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginRequestDto {
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @IsString()
  password: string;
}
