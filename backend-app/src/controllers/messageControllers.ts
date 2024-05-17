import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Message, { IMessage } from "../models/messageModel.js";
import User from "../models/UserModel.js";
import Chat, { IChat } from "../models/chatModel.js";
import mongoose, { Document } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


const sendMessage = asyncHandler(async(req:Request, res: Response): Promise<void> => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        console.log("Invalid data passed into request");
         res.sendStatus(400);
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await message.populate({
            path: "chat.users",
            select: "name pic email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message,
        });

        res.json(message)
        
    } catch (error:any) {
        res.status(400);
        throw new Error(error.message)
        
    }
});

const allMessage = asyncHandler(async(req:Request, res: Response)=>{
    try {
        const messages = await Message.find({chat: req.params.chatId})
            .populate("sender", "name pic email")
            .populate("chat");

            res.json(messages);

    } catch (error:any) {
        res.status(400);
            throw new Error(error.message);
        
    }
});

export {sendMessage,allMessage};