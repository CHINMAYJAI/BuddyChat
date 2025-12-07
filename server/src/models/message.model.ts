import { Schema, model, Types } from "mongoose";

interface IMessage {
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

const messageSchema = new Schema<IMessage>(
  {
    chatroomId: {
      type: Schema.Types.ObjectId,
      ref: "Chatroom",
      required: true,
    },

    senderId: {
      type: String, // pgs userId
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "document"],
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    text: String,
    filename: String,
    mediaUrl: String,
    mimetype: String,
    size: Number,
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
