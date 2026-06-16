/* eslint-disable prettier/prettier */
// import { z } from 'zod';
// import { login } from '../authentication.validation';

import { IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

// export type loginDto = z.infer<typeof login>;

// // Equivalent to:
// //
// // {
// //   username: string;
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// // }

export class SignupDto {
  @MaxLength(55)
  @MinLength(2)
  @IsNotEmpty()
  username!: string;

@IsStrongPassword(min)
  password!: string;
}
