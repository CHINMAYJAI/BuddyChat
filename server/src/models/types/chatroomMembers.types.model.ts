import { Types } from "mongoose";

export interface IChatroomMembers {
    _id?: Types.ObjectId;
    chatroomId: Types.ObjectId;
    userId: string;
    joinedAt: Date;
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
}
