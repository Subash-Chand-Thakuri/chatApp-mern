import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import { NextFunction,Request, Response } from 'express';

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("password");

            next();

        }catch(err){
            res.status(err);
            throw new Error("Not authorized, token failed")
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token")
    }

})

export default protect;