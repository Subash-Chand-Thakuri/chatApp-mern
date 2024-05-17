import asyncHandler from "express-async-handler";
import Chat, { IChat, IMessage } from "../models/chatModel.js"
import { Request, Response } from "express";
import User from "../models/UserModel.js";
import mongoose,{ Document, PopulateOptions } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const accessChat = asyncHandler(async (req:Request, res: Response): Promise<void> => {
    const { userId } = req.body;

    if(!userId){
        // console.log("UserId param is not sent with request");
        res.status(400).send({ message: "UserId param is not sent with the request" });
        return;
    }

    var isChat: (Document<unknown, {}, IChat> & IChat & { _id: typeof ObjectId })[] = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");


      isChat = await Chat.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    }) as (Document<unknown, {}, IChat> & IChat & { _id: mongoose.Types.ObjectId })[];

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({
                _id: createdChat._id
            }).populate("users","-password");

            res.status(200).send(FullChat)

        } catch (error:any) {
            res.status(400);
            throw new Error(error.message);
        }
    }
    

});

const fetchChats = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Find chats where the user is a participant or the group admin
        const chats = await Chat.find({
            $or: [{ users: req.user._id }, { groupAdmin: req.user._id }],
        })
            
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "name pic email",
                },
            })
           
            .sort({ updatedAt: -1 });

        res.status(200).send(chats);
    } catch (error:any) {
        res.status(400);
        throw new Error(error.message);
    }
});


const createGroupChat = asyncHandler(async (req:Request, res: Response) => {
    if(!req.body.users || !req.body.name){
         res.status(400).send({message: "Please fill all the fields"});
    }

    var users = JSON.parse(req.body.users);

    if(users.length < 2){
        res
            .status(400)
            .send("More than 2 users are required to form a group chat")
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

            const FullGroupChat = await Chat.findOne({
                _id: groupChat._id
            }).populate("users","-password")
            .populate("groupAdmin","-password");

            res.status(200).send(FullGroupChat)

    } catch (error:any) {
        res.status(400);
        throw new Error(error?.message);
    }

});

const renameGroup = asyncHandler(async(req:Request, res: Response)=>{
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true
        }
    ).populate("users","-password")
     .populate("groupAdmin", "-password")


     if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found")
     }else{
        res.json(updatedChat)
     }

});

const addToGroup = asyncHandler(async(req:Request, res: Response)=>{
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push : { users: userId},
        },
        {new: true}
    ).populate("users","-password")
        .populate("groupAdmin","-password")

    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");

    }else{
        res.json(added);
    }
});

const removeFromGroup = asyncHandler(async(req:Request, res: Response)=>{
    const {chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull : { users: userId},
        },
        {new: true}
    ).populate("users","-password")
        .populate("groupAdmin","-password")

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found");

    }else{
        res.json(removed);
    }
});

 
export { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup};