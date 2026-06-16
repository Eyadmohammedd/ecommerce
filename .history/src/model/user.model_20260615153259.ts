import { Prop, Schema } from '@nestjs/mongoose';
import { IUser } from 'src/common/interfaces';

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