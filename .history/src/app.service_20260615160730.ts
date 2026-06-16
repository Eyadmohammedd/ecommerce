import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SignupDto } from 'src/modules/authentication/dto/authentication.dto';
import { User } from 'src/model/user.model';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<IUser>,
  ) {}

  async signup(data: SignupDto): Promise<IUser> {
    const user = await this.model.create(data);
    return user.toJSON();
  }
}
