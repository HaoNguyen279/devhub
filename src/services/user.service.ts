import { User } from "../generated/prisma/client.ts";
import { UserRepository } from "../repositories/user.repository.ts";
import type { CreateUserInput, VerifyUserInput } from "../types/user.types.ts";
import bcrypt from 'bcrypt';
const userRepository = new UserRepository();
export class UserService {

    async getUserByEmail(email : string){
        const user = userRepository.findByEmail(email);
        return user;
    }
    async verifyUser(user : VerifyUserInput){
        try{
            return userRepository.verifyUser(user);
        }catch(error){
            console.error(error);
            throw new Error('Failed to verify user');
        }
    }
    async createUser(user : CreateUserInput){
        try{
            const hashedPassword = await bcrypt.hash(user.password, 10)
            const newUser = await userRepository.create({...user, password : hashedPassword});
            return newUser;
        }catch(error){
            console.error(error);
            throw new Error('Failed to create user');
        }
    }
}