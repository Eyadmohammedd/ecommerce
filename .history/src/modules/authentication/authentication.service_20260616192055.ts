import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { SignupDto } from './dto/authentication.dto';

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
