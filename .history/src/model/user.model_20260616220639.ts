import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enum';
import { IUser } from 'src/common/interface/user.interface';
import { generateEncryption, generateHash } from 'src/common/utils/security';
// import { cascadeSoftDeleteUserRelated } from 'src/common/utils/cascade'; // Uncomment if implemented

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

  @Prop({ type: String, required: true })
  slug!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String })
  profilePicture?: string;

  @Prop({ type: [String] })
  profileCoverPicture?: string[];

  @Prop({ type: String, enum: Object.values(GenderEnum), default: GenderEnum.MALE })
  gender!: GenderEnum;

  @Prop({ type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER })
  role!: RoleEnum;

  @Prop({ type: String, enum: Object.values(ProviderEnum), default: ProviderEnum.SYSTEM })
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

// Virtual username
UserSchema.virtual('username')
  .get(function (this: UserDocument) {
    return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
  })
  .set(function (this: UserDocument, value: string) {
    const [firstName, ...rest] = value.split(' ');
    this.firstName = firstName || this.firstName;
    this.lastName = rest.join(' ') || this.lastName;
  });

// Pre-save hook
UserSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password') && this.password) {
    this.password = await generateHash({ plaintext: this.password });
  }

  if (this.phone && this.isModified('phone')) {
    this.phone = await generateEncryption(this.phone);
  }

  if (this.isModified('firstName') || this.isModified('lastName')) {
    const fullName = `${this.firstName} ${this.lastName}`;
    this.slug = fullName.replace(/\s+/g, '-').toLowerCase();
  }

  if (this.isModified('deletedAt') && this.deletedAt) {
    // Uncomment if implemented
    // await cascadeSoftDeleteUserRelated(this);
  }
});

// Pre-updateOne (document middleware)
UserSchema.pre(
  'updateOne',
  { document: true, query: false },
  async function (this: UserDocument) {
    const update = this.getUpdate() as Record<string, any>;
    const set = update?.$set ?? {};

    if (set.password) {
      set.password = await generateHash({ plaintext: set.password });
    }

    if (set.phone) {
      set.phone = await generateEncryption(set.phone);
    }

    const firstName = set.firstName ?? this.firstName;
    const lastName = set.lastName ?? this.lastName;
    if (set.firstName || set.lastName) {
      set.slug = `${firstName} ${lastName}`.replace(/\s+/g, '-').toLowerCase();
    }

    update.$set = set;
  },
);

// Pre-find queries (soft delete filter)
UserSchema.pre(['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete'], function (this: any) {
  if (this.getOptions().withDeleted) return;
  const filter = this.getFilter();
  if (filter.deletedAt === undefined) {
    this.where({ deletedAt: null });
  }
});

// Pre-update queries (soft delete + hashing)
UserSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], { document: false, query: true }, async function (this: any) {
  const filter = this.getFilter();
  if (filter.deletedAt === undefined) {
    this.where({ deletedAt: null });
  }

  const update = this.getUpdate() as Record<string, any>;
  const set = update?.$set ?? {};

  if (set.password) {
    set.password = await generateHash({ plaintext: set.password });
  }

  if (set.phone) {
    set.phone = await generateEncryption(set.phone);
  }

  if (set.firstName || set.lastName) {
    const currentDoc = await this.model.findOne(filter).lean();
    const firstName = set.firstName ?? currentDoc?.firstName ?? '';
    const lastName = set.lastName ?? currentDoc?.lastName ?? '';
    set.slug = `${firstName} ${lastName}`.replace(/\s+/g, '-').toLowerCase();
  }

  update.$set = set;
});

// Soft delete operations
const DELETE_OPS = ['deleteOne', 'deleteMany'] as const;

DELETE_OPS.forEach((op) => {
  UserSchema.pre(op, { document: false, query: true }, async function (this: any) {
    const filter = this.getFilter();
    const softFilter = { ...filter, deletedAt: null };

    if (op === 'deleteOne') {
      await this.model.updateOne(softFilter, { $set: { deletedAt: new Date() } });
    } else {
      await this.model.updateMany(softFilter, { $set: { deletedAt: new Date() } });
    }

    // Prevent actual deletion
    this.setQuery({ _id: null });
  });
});

// Export model
export const UserModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => UserSchema,
  },
]);
