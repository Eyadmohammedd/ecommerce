/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { SignupDto } from './dto/authentication.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Injectable()
export class AuthenticationService {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signup(data: SignupDto) {
    return { id: 1, username: 'eyad' };
  }
}
