/* eslint-disable prettier/prettier */

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import type { SignupDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) body: SignupDto) {
    console.log(body);

    // const user = this.authenticationService.signup(body)

    return { message: 'Done', body };
  }
}
