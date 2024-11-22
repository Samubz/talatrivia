import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'OnlyOneValidOption', async: false })
export class OnlyOneValidOptionConstraint
  implements ValidatorConstraintInterface
{
  validate(options: any[], args: ValidationArguments) {
    if (!Array.isArray(options)) {
      return false;
    }
    const validCount = options.filter((option) => option.valid === true).length;

    return validCount == 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Only one option can have "valid" set to true.';
  }
}

export function OnlyOneValidOption(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OnlyOneValidOptionConstraint,
    });
  };
}
