import { UserModel } from 'src/model/user.model';
import { AuthenticationController } from './auth.controller';

@Module({
  imports: [UserModel],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}