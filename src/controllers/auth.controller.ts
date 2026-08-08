import {type Request, type Response } from 'express';
import { UserService } from '../services/user.service.ts';
import type { Prisma } from '../generated/prisma/client.ts';
import type { CreateUserInput, VerifyUserInput} from '../types/user.types.ts';


const userService = new UserService();
export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if(!user)
            return res.status(200).json({message : 'User not found, please check your email again!'})
        else{
            const isVerified = await userService.verifyUser({email, password} as VerifyUserInput);
            if(isVerified)
                return res.status(200).json({message: 'Verified successfully'})
            else
                return res.status(200).json({message: 'Invalid password, please check your password again!'})
        }
    }
    async register (req: Request, res: Response){
        const {email, password, name} = req.body;
        const user = await userService.getUserByEmail(email);
        if(user)
            return res.status(200).json({message: 'Email already used!'})
        else{
            const newUser : CreateUserInput = {
                email: email,
                password: password,
                name: name
            };
            await userService.createUser(newUser);
        }
        return res.status(200).json({message: 'User created successfully' })
    }
}

