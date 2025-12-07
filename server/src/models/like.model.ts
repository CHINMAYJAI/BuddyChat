import { Schema, model, Types } from "mongoose";

interface ILike {
  id?: Types.ObjectId;
  messageId: Types.ObjectId;
  likedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
