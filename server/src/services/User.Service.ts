import { omit } from 'lodash'
import UserModel, { UserInput } from '../models/User.model'

export async function createUser(input: UserInput) {
    console.log(input)
    try {
        return await UserModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export const validatePassword = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const user = await UserModel.findOne({ email })

    if (!user) return false

    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return omit(user.toJSON(), 'password')
}
