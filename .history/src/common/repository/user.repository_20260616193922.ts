import { IUser } from '../../common/interface';
import { UserModel } from '../../model/index';
import { DatabaseRepository } from './base.repository';
export  class UserRepository extends DatabaseRepository<IUser> {
    constructor(){
        super(userModel);
    }
}
  