import 'express-serve-static-core';
import {IUser} from '../src/models/UserModel.js';


declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
