import { Schema, model, Types } from "mongoose";
import type { ILike } from "./types/index.types.model.js";

const likeSchema = new Schema<ILike>(
    {
        messageId: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        },

        likedBy: {
            type: String, // pgs userId
            required: true,
        },
    },
    { timestamps: true }
);

export const Like = model<ILike>("Like", likeSchema);
