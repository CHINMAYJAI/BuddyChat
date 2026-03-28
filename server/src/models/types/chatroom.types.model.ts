import {Types} from "mongoose";

export interface IChatroom {
    _id?: Types.ObjectId;
    chatroomName: string;
    createdBy: Types.ObjectId;
    members: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}