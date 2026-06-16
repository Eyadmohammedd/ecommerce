




export  class UserRepository extends DatabaseRepository<IUser> {
    constructor(){
        super(UserModel);
    }
}
  