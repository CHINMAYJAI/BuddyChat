import { Schema, model, Types } from "mongoose";

interface IChatroomMembers {
  _id?: Types.ObjectId;
  chatroomId: Types.ObjectId;
  userId: string;
  joinedAt: Date;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

const chatroomMembersSchema = new Schema<IChatroomMembers>(
  {
    chatroomId: {
      type: Schema.Types.ObjectId,
      ref: "Chatroom",
      required: true,
    },

    userId: {
      type: String, // pgs userId
      required: true,
    },

    joinedAt: {
      type: Date,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  { timestamps: true }
);

export const ChatroomMembers = model<IChatroomMembers>(
  "ChatroomMembers",
  chatroomMembersSchema
);
