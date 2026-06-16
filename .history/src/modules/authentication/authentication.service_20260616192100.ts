import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { LoginDto, SignupDto } from './dto/authentication.dto';
import { login } from './authentication.validation';

@Injectable()
export class AuthenticationService {
  constructor() {}

  signup(data: SignupDto) {
    return { data, message: 'Done' };
  }
}

  login(data: LoginDto) {
    return { data, message: 'Done' };
  }
}
