import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { getAllUsers } from '../endpoints/user/userService'
import User, { UserInterface } from '../endpoints/user/UserModel'

dotenv.config()

const url = process.env.DATABASE_URL

export function startDB() {
    console.log(`Connecting to database ${url}`)
    if (url) mongoose.connect(url)
    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => {
        console.log('Connected to Database')
        ensureAdmin()
    })
}

export async function ensureAdmin() {
    const users = await getAllUsers()
    if (users.length > 0) return
    const admin = new User({
        userID: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        password: '123',
        isAdministrator: true
    })
    await admin.save()
    console.log('Added admin user.')
}

