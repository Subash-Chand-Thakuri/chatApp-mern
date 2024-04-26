import { Request } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Use a more specific type if possible
  }
}
