import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';


export interface UserInput {
    email: string
    name: string
    password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});


userSchema.pre('save', async (next) => {

    let user = this as unknown as UserDocument

    if(!user.isModified) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash

    return next();
})

userSchema.methods.comparePassword = async (candidatePassword: string): Promise<Boolean> => {
    const user = this as unknown as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e)=> false);  

}

const UserModel = mongoose.model('User', userSchema)

export default UserModel;