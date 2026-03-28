import { Schema, model, Types } from "mongoose";
import type { IChatroomMembers } from "./types/index.types.model.js";

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

// prevent duplicate user in same room
chatroomMembersSchema.index({ chatroomId: 1, userId: 1 }, { unique: true });

export const ChatroomMembers = model<IChatroomMembers>(
    "ChatroomMembers",
    chatroomMembersSchema
);
