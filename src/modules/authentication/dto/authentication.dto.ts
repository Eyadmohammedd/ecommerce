import { z } from 'zod';
import { login, signup } from '../authentication.validation';

export type SignupDto = z.infer<typeof signup>;
export type loginDto = z.infer<typeof login>;

// Equivalent to:
//
// {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }
