import { UserModel } from 'src/model/user.model';

@Module({
  imports: [UserModel],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}