import { Prop, Schema, Virtual } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enum';
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
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;
  @Virtual({
    set: function (this: any, value: string) {
      const [firstName, lastName] = value.split(' ') || [];

      this.firstName = firstName;
      this.lastName = lastName;
    },

    get: function (this: any) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  username?: string;
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
  @Prop({
    type: Number,
    enum: GenderEnum,
    default: GenderEnum.MALE,
  })
  gender!: GenderEnum;

  @Prop({
    type: Number,
    enum: ProviderEnum,
    default: ProviderEnum.SYSTEM,
  })
  provider!: ProviderEnum;

  @Prop({
    type: Number,
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role!: RoleEnum;
}
