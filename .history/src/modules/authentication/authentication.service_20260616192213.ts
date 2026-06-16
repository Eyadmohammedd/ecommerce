import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { LoginDto, SignupDto } from './dto/authentication.dto';
import { login } from './authentication.validation';
import { User } from 'src/model/user.model';
import { IUser } from 'src/common/interface/user.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
  ) {}

  async signup(data: SignupDto) {
    return { data, message: 'Done' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user data (excluding password)
    const userResponse = user.toJSON();
    return {
      message: 'Login successful',
      data: userResponse,
    };
  }
}
