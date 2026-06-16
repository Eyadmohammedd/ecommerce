/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return value === (args.object as any)[relatedPropertyName];
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

export class SignupDto {
  @MaxLength(55)
  @MinLength(2)
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  })
  password!: string;

  @IsNotEmpty()
  @MinLength(8)
  @Match('password', { message: 'confirmPassword must match password' })
  confirmPassword!: string;
}
