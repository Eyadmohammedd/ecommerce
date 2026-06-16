import { DatabaseRepository } from "./base.repository";





export  class UserRepository extends DatabaseRepository<IUser> {
    constructor(){
        super(UserModel);
    }
}
  