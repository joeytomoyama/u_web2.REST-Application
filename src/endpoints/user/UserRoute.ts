import express from 'express'
import bcryptjs from 'bcryptjs'

import User from './UserModel'
import mongoose from 'mongoose'

const router = express.Router()

// Getting all
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Getting one
router.get('/:userID', getUser, (req: any, res: any) => {
    res.status(201).json(res.user)
})

// Creating one
router.post('/', async (req: any, res: any) => {
    const salt = await bcryptjs.genSalt()
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

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
    } catch(error) {
        res.status(400).json({ message: error })
    }
})

// Updating one
router.put('/:userID', async(req: any, res: any) => {
    // hash password, if password was changed.
    if (req.body.password) {
        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)
        req.body.password = hashedPassword
    }

    try {
        const newUser = await User.findOneAndUpdate({ userID: req.params.userID }, req.body, { new: true })
        res.status(200).json(newUser)
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
        res.status(500).json({ message: error.message})
    }
})

// Middleware function to find a user
async function getUser(req: any, res: any, next: any) {
    let user: mongoose.Schema | null
    try {
        user = await User.findOne({ userID: req.params.userID })
        if (user == null) return res.status(404).json({ message: 'Cannot find user' })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

// Just for testing password hashing
router.post('/login', async (req: any, res: any) => {
    const user = await User.findOne({ userID: req.body.userID })
    if (user === null) return
    try {
        if (await bcryptjs.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

export default router