// jsonwebtoken.d.ts
declare module 'jsonwebtoken' {
    export function sign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions): string;
    export function verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): object | string;
    // ... other functions you might use
  }
  