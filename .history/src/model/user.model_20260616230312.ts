import { Inject } from '@nestjs/common';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enum';
import { IUser } from 'src/common/interface/user.interface';
import { generateEncryption, generateHash } from 'src/common/module/security';
import { SecurityModule } from 'src/common/module/security/security.module';
import { SecurityService } from 'src/common/module/security/security.service';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strict: true,
  strictQuery: true,
  collection: 'Ecommerce_APP_USERS',
})
export class User implements IUser {
  @Prop({ type: Types.ObjectId })
  _id!: Types.ObjectId | string;

  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  username?: string;

  @Prop({ type: String, required: true })
  slug!: string;
  @Prop({ type: String, required: true })
  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: true })
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
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('username')
  .get(function (this: UserDocument) {
    return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
  })
  .set(function (this: UserDocument, value: string) {
    const [firstName, ...rest] = value.split(' ');
    this.firstName = firstName || this.firstName;
    this.lastName = rest.join(' ') || this.lastName;
  });

async function cascadeSoftDeleteUserRelated(user: UserDocument) {
  const now = new Date();
  await user
    .model('Post')
    .updateMany(
      { createdBy: user._id, deletedAt: null },
      { $set: { deletedAt: now } },
    );
  await user
    .model('Comment')
    .updateMany(
      { createdBy: user._id, deletedAt: null },
      { $set: { deletedAt: now } },
    );
  await user.model('Notification').updateMany(
    {
      $or: [{ recipientId: user._id }, { senderId: user._id }],
      deletedAt: null,
    },
    { $set: { deletedAt: now } },
  );
}

export const userschema = SchemaFactory.createForClass(User);
UserSchema.pre('save', function () {
  console.log('Hello from pre save one');
});
export const UserModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    imports: [SecurityModule],
    useFactory: (SecurityService:
]);
