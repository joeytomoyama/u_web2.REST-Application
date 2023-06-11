import User from './userModel'

export async function getAllUsers(): Promise<Array<object>> {
    return await User.find()
}

export async function getOneUser(userID: string) {
    return await User.findOne({ userID: userID })
}

export async function postOneUser(bodyUser: Record<any, any>) {
    const user = new User({
        userID: bodyUser.userID,
        firstName: bodyUser.firstName,
        lastName: bodyUser.lastName,
        password: bodyUser.password,
        isAdministrator: bodyUser.isAdministrator
    })
    return await user.save()
}

export async function updateOneUser(userID: string, newUser: Record<any, any>) {
    const user = await getOneUser(userID)
    if (!user) return null

    Object.assign(user, newUser)
    return await user.save()
}

export async function deleteOneUser(userID: string) {
    return await User.deleteOne({ userID: userID })
}