import jwt, { Secret } from 'jsonwebtoken';


const generateToken = (id:string) => {
    return jwt.sign({id},process.env.JWT_SECRET! as Secret, {
        expiresIn: "30d",

    })
}

export default generateToken;