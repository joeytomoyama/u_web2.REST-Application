import express from 'express'
import dotenv from 'dotenv'

import { startDB } from './db/Database'

import userRoute from './endpoints/user/UserRoute'

dotenv.config()

const app: express.Express = express()
const port = process.env.PORT

startDB()

app.use(express.json())

app.use('/api/publicUsers', userRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})