import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../config/generateToken.js";
import { Request,Response } from "express";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    console.log(user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    });
  }else{
    res.status(400);
    throw new Error("Failed to create the user")
  }

});


const authUser = asyncHandler(async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        console.log(user)
        res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    });
    }else{
        res.status(400);
        throw new Error("Wrong Credentials")
      }


});

const allUsers = asyncHandler(async(req: Request, res: Response) => {
    const keyword = req.query.search ? {
      $or : [
        {name: {$regex: req.query.search,$options: 'i'}},
        {email: {$regex: req.query.search,$options: 'i'}},
      ],
    }: {};

    const users = await User.find(keyword).find({_id:{$ne: req.user._id}});

    res.json({
      users
    })
}
);



export {registerUser,authUser, allUsers};
