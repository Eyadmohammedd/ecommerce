/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import type { SignupDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';
import { CustomValidationPipe } from 'src/common/pipe/validation.pipe';
import {signup } from './authentication.validation';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(
    @Body(ValidationPipe) body: SignupDto) {
    console.log(body);

    // const user = this.authenticationService.signup(body);

    return { message: 'Done', body };
  }

  // @Post('login')
  // login(
  //   @Body(new CustomValidationPipe<loginDto>(login)) // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   body: loginDto,
  // ) {
  //   return 'Login Page';
  // }
}
