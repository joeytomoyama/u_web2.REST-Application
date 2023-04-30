import express from 'express'
import bodyParser = require('body-parser')

import userService from './UserService'
import User from './UserModel'

const router = express.Router()

// get all
// router.get('/', (req, res, next) => {
//     userService.getUsers((err, result) => {
//         if (result) {
//             res.status(200).json(Object.values(result))
//         } else {
//             res.status(404).json({ error: err })
//         }
//     }
// })