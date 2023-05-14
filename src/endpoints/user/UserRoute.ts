import express from 'express'
import * as Services from './userService'

const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await Services.getAllUsers()
        res.status(200).send(users)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Getting one
router.get('/:userID', async (req: any, res: any) => {
    const user = await Services.getOneUser(req.params.userID)
    user ? res.status(201).json(user) : res.status(404).json({ Error: 'User not found' })
})

// Creating one
router.post('/', async (req: any, res: any) => {
    try {
        await Services.postOneUser(req.body)
        res.status(201).json('User has been posted.')
    } catch(error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate ID not allowed.' })
        } else if (error.name === "ValidationError") {
            res.status(400).json({ message: 'Required property missing.' }) 
        } else {
            res.status(500).json({ message: error })
        }
    }
})

// Updating one
router.put('/:userID', async(req: any, res: any) => {
    if (req.params.userID) res.status(400).send('ID missing.')
    try {
        const updatedUser = await Services.updateOneUser(req.params.userID, req.body)
        if (updatedUser) {
            res.status(200).json(updatedUser)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error })
    }
})

// Deleting one
router.delete('/:userID', async (req: any, res: any) => {
    if (req.params.userID) res.status(400).send('ID missing.')
    try {
        await Services.deleteOneUser(req.params.userID)
        res.status(200).json(`User ${req.params.userID} deleted.`)
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

export default router