/* eslint-disable prettier/prettier */

import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';


export class SignupDto {
  @MaxLength(55)
  @MinLength(2)
  @IsNotEmpty()
  username!: string;


  @IsEmail({})
  email!: string;

  @IsStrongPassword({
    minNumbers: 3,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password!: string;

  @Allow()
  confirmPassword!: string;
}
