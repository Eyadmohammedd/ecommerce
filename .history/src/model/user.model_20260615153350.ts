 import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GenderEnum, RoleEnum, ProviderEnum } from 'src/common/enum';
import { IUser } from 'src/common/interface/user.interface';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
  collection: 'SOCIAL_APP_USERS',
})
export class User implements IUser {
  _id: string | Types.ObjectId;
  username?: string | undefined;
  slug: string;
  profileCoverPicture?: string[] | undefined;
  gender: GenderEnum;
  role: RoleEnum;
  provider: ProviderEnum;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true, unique: true })
  password!: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String, required: false })
  profilePicture?: string;

  @Prop({ type: [String], required: false })
  profileCoverPictures?: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  friends!: Types.ObjectId[];

  @Prop({ type: Date })
  DOB?: Date;

  @Prop({ type: Date })
  deletedAt?: Date;

  @Prop({ type: Date })
  restoredAt?: Date;

  @Prop({ type: Date })
  confirmEmail?: Date;

  @Prop({ type: Date })
  changeCredentialsTime?: Date;
}