import express from 'express'
import bcryptjs from 'bcryptjs'

import User from './UserModel'
import mongoose from 'mongoose'

const router = express.Router()


router.get('/', (res: any, req: any) => {
    res.send('Authenticate yourself!')
})


export default router