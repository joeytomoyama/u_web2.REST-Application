import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from './UserModel'

const router = express.Router()

dotenv.config()

router.get('/', async (req: any, res: any) => {
    const base64string = req.headers.authorization.split(' ')[1]
    const decodedString = Buffer.from(base64string, 'base64').toString('utf-8');
    const nameAndPW = decodedString.split(':')

    const user = await User.findOne({ userID: nameAndPW[0] })
    if (user === null) {
        res.status(404).send('not found')
        return
    }
    const isAuthenticated = await bcryptjs.compare(nameAndPW[1], user.password)
    if (!isAuthenticated) {
        res.status(401).json({Error: 'password incorrect'})
        return
    }
    const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET as jwt.Secret, { expiresIn: '60s' })
    res.set('Authorization', 'Bearer ' + token)
    res.status(201).json({ Success: 'Token created successfully.' })
})


export default router