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
  async signup(
    @Body()
    body: SignupDto,
  ) {
    return await this.authenticationService.signup(body);
  }

  @UsePipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body()
    body: LoginDto,
  ) {
    return await this.authenticationService.login(body);
  }
}
