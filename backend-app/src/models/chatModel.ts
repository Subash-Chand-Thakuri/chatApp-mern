import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

// TypeScript interfaces
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  pic: string;
}

interface IMessage {
  _id: ObjectId;
  content: string;
  sender: IUser;
  // Other properties...
}

interface IChat extends Document {
  chatName?: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage?: IMessage;
  groupAdmin?: IUser;
}

// Mongoose schema
const chatModel = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<IChat>('Chat', chatModel);

export default Chat;
