import User from './UserModel'

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
    if (newUser.firstName) user.firstName = newUser.firstName
    if (newUser.lastName) user.lastName = newUser.lastName
    if (newUser.password) user.password = newUser.password
    if (newUser.isAdministrator) user.isAdministrator = newUser.isAdministrator
    return await user.save()
}

export async function deleteOneUser(userID: string) {
    return await User.deleteOne({ userID: userID })
}