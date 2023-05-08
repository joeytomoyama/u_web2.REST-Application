import mongoose from 'mongoose'

import User from './UserModel'

export async function getAllUsers(): Promise<Array<object>> {
    return await User.find()
}

export async function getOneUser(userID: string) {
    return await User.findOne({ userID: userID })
}

// export async function postUser(user) {
//     return await 
// }