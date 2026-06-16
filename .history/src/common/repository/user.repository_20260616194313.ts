import { User, UserModel } from "src/model";
import { IUser } from "../interface";
import { DatabaseRepository } from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { AnyKeys, DefaultSchemaOptions, Document, Model, Types } from "mongoose";




@insertMany({ data, }: { data: AnyKeys<IUser>[]; }): Promise<(Document<unknown, {}, IUser, {}, DefaultSchemaOptions> & IUser & { _id: Types.ObjectId; } & { __v: number; } & { id: string; })[]> {
    
}
export  class UserRepository extends DatabaseRepository<IUser> {
    constructor(@InjectModel(User.name)protected readonly model:Model<IUser>){
        super(model);
    }
}
  