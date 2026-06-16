/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, SignupDto, SignupQueryDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @UsePipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post('signup')
  signup(
    @Body()
  
    body: SignupDto,
  ) {
    console.log(body);

  
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
