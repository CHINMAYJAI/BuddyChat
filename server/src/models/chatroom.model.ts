import { Schema, model, Types } from "mongoose";
import type { IChatroom } from "./types/chatroom.types.model.js";

const chatroomSchema = new Schema<IChatroom>(
    {
        chatroomName: {
            type: String,
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
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
