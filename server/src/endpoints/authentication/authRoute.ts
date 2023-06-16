import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import * as Services from '../user/userService'

const router = express.Router()

dotenv.config()

router.get('/', async (req: any, res: any) => {
    if (!req.headers.authorization) return res.status(401).json({ Error: 'No authorization header.' })
    // decode id and password
    const base64string = req.headers.authorization.split(' ')[1]
    const decodedString = Buffer.from(base64string, 'base64').toString('utf-8')
    const nameAndPW = decodedString.split(':')

    const user = await Services.getOneUser(nameAndPW[0])
    if (!user) {
        return res.status(401).json({ Error: 'Invalid login.' })
    }
    const isAuthenticated = await bcryptjs.compare(nameAndPW[1], user.password)
    if (!isAuthenticated) {
        return res.status(401).json({ Error: 'Invalid login.' })
    }
    const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET as jwt.Secret, { expiresIn: '3000s' })
    res.set('Authorization', 'Bearer ' + token)
    res.status(200).json({ Success: 'Token created successfully.' })
})


export default router