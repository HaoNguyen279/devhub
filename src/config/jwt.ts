import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signToken = (payload : object) =>{
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"],
    });
}

export const verifyToken = (token : string) =>{
    return jwt.verify(token, process.env.JWT_SECRET as string);
}