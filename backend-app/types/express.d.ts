import 'express-serve-static-core';
import {IUser} from '../src/models/UserModel';


declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

declare module 'express';