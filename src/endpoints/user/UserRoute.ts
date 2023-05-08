import express from 'express'
import bcryptjs from 'bcryptjs'

import User from './UserModel'
import { getAllUsers, getOneUser } from './userService'
// import mongoose from 'mongoose'

const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).send(users)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Getting one
router.get('/:userID', async (req: any, res: any) => {
    const user = await getOneUser(req.params.userID)
    user ? res.status(201).json(user) : res.status(404).json({ Error: 'user not found' })
})

// Creating one
router.post('/', async (req: any, res: any) => {
    // if (!req.body.userID) res.status(400).json({ message: 'id is definitely required' })

    const salt = bcryptjs.genSaltSync()
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

    const user = new User({
        userID: req.body.userID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        isAdministrator: req.body.isAdministrator
    })

    try {
        await user.save()
        res.status(201).json(user)
    } catch(error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate ID not allowed.' })
        } else {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: 'Required property missing.' })
            } else {
                res.status(500).json({ message: error })
            }
        }
    }
})

// Updating one
router.put('/:userID', async(req: any, res: any) => {
    // hash password, if password was changed.
    if (req.body.password) {
        const salt = bcryptjs.genSaltSync()
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt)
        req.body.password = hashedPassword
    }

    try {
        const newUser = await User.findOneAndUpdate({ userID: req.params.userID }, req.body, { new: true })
        if (newUser) {
            res.status(200).json(newUser)
        } else {
            res.status(404).json({message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error })
    }
})

// Deleting one
router.delete('/:userID', getUser, async (req: any, res: any) => {
    try {
        await User.deleteOne(res.user)
        res.status(200).json(res.user)
    } catch(error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Middleware function to find a user
// async function getUser(req: any, res: any, next: any) {
//     let user: mongoose.Schema | null
//     try {
//         user = await User.findOne({ userID: req.params.userID })
//         if (user == null) return res.status(404).json({ message: 'User not found' })
//     } catch (err: any) {
//         return res.status(500).json({ message: err.message })
//     }
//     res.user = user
//     next()
// }

// Just for testing password hashing
// router.post('/login', async (req: any, res: any) => {
//     const user = await User.findOne({ userID: req.body.userID })
//     if (user === null) return
//     try {
//         if (await bcryptjs.compare(req.body.password, user.password)) {
//             res.send('Success')
//         } else {
//             res.send('Not Allowed')
//         }
//     } catch {
//         res.status(500).send()
//     }
// })

export async function ensureAdmin() {
    const users = await User.find()
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

export default router