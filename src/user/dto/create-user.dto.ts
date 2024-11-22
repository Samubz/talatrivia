import {
  IsString,
  IsEmail,
  MaxLength,
  IsBoolean, 
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CustomPasswordValidator } from '@core/validators/custom-password-validator';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { Match } from '@core/validators/match-passwords.validator';
import { ProfileTypeDomain, ProfileTypeMap } from '../domain/role.domain';

export class CreateUserDto {
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @CustomPasswordValidator({ message: ResponseErrorMessage.PASSWORD_NOT_VALID })
  password: string;

  @IsString()
  @CustomPasswordValidator({ message: ResponseErrorMessage.PASSWORD_NOT_VALID })
  @Match('password', { message: ResponseErrorMessage.PASSWORDS_NOT_MATCH })
  confirmPassword: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(ProfileTypeMap)
  profileType: ProfileTypeDomain;
}
