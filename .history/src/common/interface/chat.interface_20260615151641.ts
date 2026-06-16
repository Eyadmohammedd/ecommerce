import { Types } from 'mongoose';
import { IUser } from './user.interface';
import { AvailabilityEnum, ChatEnum } from '../enum';
export interface IMessage {
  content?: string;
  attachments?: string[];

  likes?: Types.ObjectId[] | IUser[];
  tags?: Types.ObjectId[] | IUser[];
  reactions?: Array<{ emoji: string; userId: Types.ObjectId }>;
  availability: AvailabilityEnum;
  createdBy: Types.ObjectId | IUser;
  createdAt: Date;
  deletedAt?: Date;
  restoredAt?: Date;
  updatedAt?: Date;
}

export interface IChat {
  participants: Types.ObjectId[] | IUser[];
  createdBy: Types.ObjectId | IUser;
  messages: IMessage[];
  type: ChatEnum;

  //ovm
  group: string;
  groupImage?: string;
  roomId: string;

  createdAt: Date;
  deletedAt?: Date;
  restoredAt?: Date;
  updatedAt?: Date;
}
