import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  private generateSlug(username: string): string {
    return username
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-');
  }

  async signup(data: SignupDto) {
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate slug from username
    const slug = this.generateSlug(data.username);

    // Generate _id for the user
    const _id = new Types.ObjectId();

    // Create user with hashed password and slug
    const user = await this.userModel.create({
      _id,
      ...data,
      password: hashedPassword,
      slug,
    });

    return {
      message: 'Signup successful',
      data: user.toJSON(),
    };
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
