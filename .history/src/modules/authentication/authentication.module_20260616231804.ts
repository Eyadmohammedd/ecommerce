import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user.model';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    MongooseModule.forFeature([{      name: User.name,
      schema: UserSchema, }]),
  ],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
