import { ResponseErrorMessage } from '@src/user/constants/response-message.constants';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { isStrongPassword } from 'class-validator';

export const PASSWORD_STRENGTH_REQUIREMENTS = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  minUppercase: 1,
};

export function CustomPasswordValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            isStrongPassword(value, PASSWORD_STRENGTH_REQUIREMENTS)
          );
        },
        defaultMessage() {
          return ResponseErrorMessage.PASSWORD_NOT_VALID;
        },
      },
    });
  };
}
