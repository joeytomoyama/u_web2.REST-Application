import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import * as Services from './userService'

const router = express.Router()

dotenv.config()

// Getting all
router.get('/', isAuthorized, async (req: any, res: any) => {
    console.log('getting all')
    if (!res.decodedUser.isAdministrator) return res.status(400).json({ Error: 'Not Authorized.' })
    try {
        const users = await Services.getAllUsers()
        res.status(200).send(cleanUser(users))
    } catch (error: any) {
        res.status(500).json({ Error: error })
    }
})

// Getting one
router.get('/:userID', isAuthorized, async (req: any, res: any) => {
    console.log('getting one')
    if (!req.params.userID) return res.status(400).send('ID missing.')
    // if not admin and not self
    if (!res.decodedUser.isAdministrator && req.params.userID !== res.decodedUser.userID) return res.status(404).json({ Error: 'Not Authorized.' })
        const user = await Services.getOneUser(req.params.userID)
        if (user) {
            res.status(200).json(cleanUser(user))
        } else {
            res.status(404).json({ Error: 'User not found' })
        }
})

// Creating one
router.post('/', isAuthorized, async (req: any, res: any) => {
    try {
        const user = await Services.postOneUser(req.body)
        res.status(201).json(cleanUser(user))
    } catch(error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate ID not allowed.' })
        } else if (error.name === "ValidationError") {
            res.status(400).json({ message: 'Required property missing.' }) 
        } else {
            res.status(500).json({ Error: error })
        }
    }
})

// Updating one
router.put('/:userID', isAuthorized, async (req: any, res: any) => {
    if (!req.params.userID) return res.status(400).send('ID missing.')
    if (req.body.userID) return res.status(400).send('Changing user ID not allowd.')

    // not admin and trying to update isAdministrator property
    if (!res.decodedUser.isAdministrator && req.body.isAdministrator !== undefined) return res.status(400).send('Not Allowed.') 
    // not admin and manipulating not self document
    if (!res.decodedUser.isAdministrator && req.params.userID !== res.decodedUser.userID) return res.status(400).send('Not Allowed.') 
    try {
        const updatedUser = await Services.updateOneUser(req.params.userID, req.body)
        if (updatedUser) {
            res.status(200).json(cleanUser(updatedUser))
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error })
    }
})

// Deleting one
router.delete('/:userID', async (req: any, res: any) => {
    if (!req.params.userID) return res.status(400).send('ID missing.')
    try {
        const deleted = await Services.deleteOneUser(req.params.userID)
        if (deleted.deletedCount > 0) {
            res.sendStatus(204) // .json(`User ${req.params.userID} deleted.`) // no body
        } else {
            res.status(404).json(`User ${req.params.userID} not found.`)
        }
    } catch(error: any) {
        res.status(500).json({ Error: error })
    }
})

export function isAuthorized(req: any, res: any, next: Function) {//authorization: string): jwt.JwtPayload | null {
    if (!req.headers.authorization) return res.status(401).send('Please enter a Token.')
    const token = req.headers.authorization.split(' ')[1]

    let decode
    let decodedObject
    try {
        decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret)
        decodedObject = decode as jwt.JwtPayload
        // const decodedObject = eval(decode as string)
        console.log(decodedObject)
        res.decodedUser = decodedObject
    } catch (error: any) {
        return res.status(500).json({ Error: error })
    }
    next()
}

export function isAdmin(req: any, res: any, next: Function) {
    if (!res.decodedUser.isAdministrator) return res.status(401).send('You are not an administrator.')
    next()
}

export function cleanUser(user: Record<any, any> | Record<any, any>[]): object | object[] {
    if (Array.isArray(user)) {
        const users = user
        const cleanUsers: Record<any, any>[] = users.map((user) => ({
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdministrator: user.isAdministrator
          }));
        return cleanUsers
    } else {
        const cleanUser: Record<any, any> = {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdministrator: user.isAdministrator
        }
        return cleanUser
    }
}

export default router