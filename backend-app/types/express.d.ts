import 'express-serve-static-core';
import {IUser} from '../src/models/UserModel.js';


declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

declare module 'express';