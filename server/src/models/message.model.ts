import { Schema, model, Types } from "mongoose";
import type { IMessage } from "./types/index.types.model.js";

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
