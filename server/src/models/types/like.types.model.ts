import { Types } from "mongoose";

export interface ILike {
    id?: Types.ObjectId;
    messageId: Types.ObjectId;
    likedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}
