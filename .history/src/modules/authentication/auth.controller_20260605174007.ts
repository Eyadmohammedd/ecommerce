import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { loginDto } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';
import { CustomValidationPipe } from 'src/common/pipe/validation.pipe';
import { login, signup } from './authentication.validation';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(
    @Body(new CustomValidationPipe<SignupDto>(signup))
    body: SignupDto,
  ) {
    console.log(body);

    // const user = this.authenticationService.signup(body);

    return { message: 'Done', body };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body(new CustomValidationPipe<loginDto>(login)) // eslint-disable-next-line @typescript-eslint/no-unused-vars
    body: loginDto,
  ) {
    return 'Login Page';
  }
}
