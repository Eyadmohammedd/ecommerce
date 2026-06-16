
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) body: SignupDto) {
    console.log(body);

    // const user = this.authenticationService.signup(body)

    return { message: 'Done', body };
  }

  // @HttpCode(HttpStatus.OK)
  // @Post("login")
  // login(
  //   @Body(new CustomValidationPipe<loginDto>(login)) body: loginDto
  // ) {
  //   return "Login Page"
  // }
}
