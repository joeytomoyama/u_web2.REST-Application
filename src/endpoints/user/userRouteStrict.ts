import express from 'express'
import dotenv from 'dotenv'

import * as Services from './userService'
import { isAuthorized, isAdmin } from '../utils'

const router = express.Router()

dotenv.config()

// Getting all
router.get('/', isAuthorized, isAdmin, async (req: any, res: any) => {
    console.log('getting all')
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
    if (!req.params.userID) return res.status(400).json({ Error: 'ID missing.' })
    // if not admin and not self
    if (!res.decodedUser.isAdministrator && req.params.userID !== res.decodedUser.userID) return res.status(403).json({ Error: 'Not Authorized.' })
        const user = await Services.getOneUser(req.params.userID)
        if (user) {
            res.status(200).json(cleanUser(user))
        } else {
            res.status(404).json({ Error: 'User not found' })
        }
})

// Creating one
router.post('/', isAuthorized, isAdmin, async (req: any, res: any) => {
    console.log('creating one')
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
    console.log('updating one')
    if (req.body.userID) return res.status(403).json({ Error: 'Changing user ID not allowd.' })

    // not admin and trying to update isAdministrator property
    if (!res.decodedUser.isAdministrator && req.body.isAdministrator !== undefined) return res.status(403).json({ Error: 'Not Allowed.' }) 
    // not admin and manipulating not self document
    if (!res.decodedUser.isAdministrator && req.params.userID !== res.decodedUser.userID) return res.status(403).json({ Error: 'Not Allowed.' }) 
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
router.delete('/:userID', isAuthorized, async (req: any, res: any) => {
    // if (!req.params.userID) return res.status(400).json({ Error: 'ID missing.' })
    // not admin and manipulating not self document
    if (!res.decodedUser.isAdministrator && req.params.userID !== res.decodedUser.userID) return res.status(403).json({ Error: 'Not Allowed.' }) 
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