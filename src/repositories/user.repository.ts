import { Verify } from "node:crypto";
import { prisma } from "../config/prisma.ts";
import { User } from "../generated/prisma/client.ts";
import bcrypt from 'bcrypt'
import type { Prisma } from "../generated/prisma/client.ts";
import type { CreateUserInput, VerifyUserInput } from "../types/user.types.ts";
export class UserRepository {
    findByEmail(emailInput : string){
        try{
            const userFind = prisma.user.findFirst({
                where:{
                    email : emailInput
                }
            })
            return userFind;
        }catch(error){
            console.log(error);
            throw new Error("Failed to find user with email");
        }
    }
    async verifyUser(userInput : VerifyUserInput){
        try{
            const userVerify = this.findByEmail(userInput.email);
            const passwordHash = (await userVerify)?.password;
            if(!passwordHash){
                throw new Error('User not found');
            }
            const isValid = await bcrypt.compare(userInput.password, passwordHash);
            if(!isValid){
                return false;
            }
            return true;
        }catch(error){
            console.error(error);
            throw new Error('Failed to verify user');
        }
    }
    create(userInput : CreateUserInput){
        try{
            const newUser = prisma.user.create({
                data: userInput
            });
            return newUser;
        }catch(error){
            console.error(error);
            throw new Error('Failed to create user');
        }
    }
}
