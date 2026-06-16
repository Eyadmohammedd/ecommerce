/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';


export class LoginDto {
  @IsEmail({})
  email!: string;

  @IsStrongPassword({
    minNumbers: 3,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password!: string;
}

export class SignupDto extends LoginDto {
  @MaxLength(55)
  @MinLength(2)
  @IsNotEmpty()
  username!: string;

  @IsMatch(['password'])
  confirmPassword!: string;
}
