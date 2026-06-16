/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    ) 
    body: SignupDto,
  ) {
    console.log(body);

    // const user = this.authenticationService.signup(body)

    return { message: 'Done', body };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        // skipUndefinedProperties: true,
        // skipNullProperties: true,
        // skipMissingProperties: true,
        dismissDefaultMessages: true,
        disableErrorMessages: true,
      }),
    )
    body: LoginDto,
  ) {
    return 'Login Page';
  }
}
