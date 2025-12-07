import { Schema, model, Types } from "mongoose";

interface IChatroom {
  _id?: Types.ObjectId;
  chatroomName: string;
  createdBy: string;
  members: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const chatroomSchema = new Schema<IChatroom>(
  {
    chatroomName: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "ChatroomMembers",
      },
    ],
  },
  { timestamps: true }
);

export const Chatroom = model<IChatroom>("Chatroom", chatroomSchema);
