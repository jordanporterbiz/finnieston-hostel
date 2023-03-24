
import { Document } from 'mongoose';
import UserModel, { UserInput } from '../models/User.model';

export async function createUser(input: UserInput) {

    try {
        return await UserModel.create(input)
    } catch (e: any) {
        throw new Error(e)
        
    }
}