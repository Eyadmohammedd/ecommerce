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
    const user = this.authenticationService.signup(body);
    return { message: 'Done', user };
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
