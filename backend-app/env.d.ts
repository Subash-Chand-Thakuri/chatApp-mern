import 'express-serve-static-core';
// import {User} from '/src/models/UserModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

declare module 'express';