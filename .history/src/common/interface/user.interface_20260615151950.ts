import { Types } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from '../enum';

export interface IUser {
  _id: Types.ObjectId | string;
  firstName: string;
  lastName: string;
  username?: string;
  slug: string;

  email: string;
  password: string;

  phone?: string;
  profilePicture?: string;
  profileCoverPicture?: string[];

  gender: GenderEnum;
  role: RoleEnum;
  provider: ProviderEnum;

  changeCredentialsTime?: Date;
  DOB?: Date;
  confirmEmail?: Date;

  deletedAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}
