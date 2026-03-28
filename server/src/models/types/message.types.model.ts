import { Types } from "mongoose";

export interface IMessage {
    _id?: Types.ObjectId;
    chatroomId: Types.ObjectId;
    senderId: string;
    type: "text" | "image" | "video" | "audio" | "document";
    text?: string;
    filename?: string;
    mediaUrl?: string;
    mimetype?: string;
    size?: number;
    likeCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
