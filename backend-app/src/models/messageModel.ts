import mongoose, { Document} from 'mongoose';
import { ObjectId } from 'mongodb';

// TypeScript interfaces
export interface IUser {
  _id: ObjectId;
  // Other user properties...
}

export interface IChat {
  _id: ObjectId;
  // Other chat properties...
}

export interface IMessage extends Document {
  sender: IUser;
  content: string;
  chat: IChat;
}

// Mongoose schema
const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: { type: String, trim: true },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>('Message', messageModel);

export default Message;
