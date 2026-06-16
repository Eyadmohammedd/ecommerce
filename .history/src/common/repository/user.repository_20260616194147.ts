import { UserModel } from "src/model";
import { IUser } from "../interface";
import { DatabaseRepository } from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";





export  class UserRepository extends DatabaseRepository<IUser> {
    constructor(@InjectModel(User.name)prote){
        super(UserModel);
    }
}
  