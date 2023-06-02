import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { getAllUsers } from '../endpoints/user/userService'
import User from '../endpoints/user/userModel'

dotenv.config()

// const url = process.env.DATABASE_URL

export function startDB(url: string): void {
    console.log(`Connecting to database ${url}`)
    mongoose.connect(url as string)
    .then(() => {
        console.log('Connected to database')
        ensureAdmin()
    })
    .catch((error) => console.log(error))
}

export async function ensureAdmin(): Promise<void> {
    try {
        const users = await getAllUsers()
        if (users.length > 0) return
    } catch (error) {
        console.log(error)
        return
    }
    const admin = new User({
        userID: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        password: '123',
        isAdministrator: true
    })
    await admin.save()
    console.log('Added admin user')
}