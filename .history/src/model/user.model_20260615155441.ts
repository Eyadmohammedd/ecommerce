import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enum';
import { IUser } from 'src/common/interface/user.interface';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
  collection: 'SeL_APP_USERS',
})
export class User implements IUser {
  @Prop({ type: Types.ObjectId })
  _id!: Types.ObjectId | string;

  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String, required: false })
  profilePicture?: string;

  @Prop({ type: [String], required: false })
  profileCoverPicture?: string[];

  @Prop({
    type: String,
    enum: Object.values(GenderEnum),
    default: GenderEnum.MALE,
  })
  gender!: GenderEnum;

  @Prop({ type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER })
  role!: RoleEnum;

  @Prop({
    type: String,
    enum: Object.values(ProviderEnum),
    default: ProviderEnum.SYSTEM,
  })
  provider!: ProviderEnum;

  @Prop({ type: Date })
  changeCredentialsTime?: Date;

  @Prop({ type: Date })
  DOB?: Date;

  @Prop({ type: Date })
  confirmEmail?: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('username')
  .get(function (this: UserDocument) {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (this: UserDocument, value: string) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName ?? this.lastName;
  });
