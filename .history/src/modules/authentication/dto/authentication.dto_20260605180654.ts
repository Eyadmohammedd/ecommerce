/* eslint-disable prettier/prettier */


import { Allow, IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

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

  @IsEmail({})
    email!: string;


@IsStrongPassword({ minNumbers: 3, minLowercase: 1, minUppercase: 1, minSymbols: 1 })
  password!: string;

@Allow()
  confirmPassword!: string;
}
