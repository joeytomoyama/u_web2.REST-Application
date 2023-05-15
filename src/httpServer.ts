import express from 'express'
import dotenv from 'dotenv'

import { startDB } from './db/Database'

import userRoute from './endpoints/user/UserRoute'
import userRouteStrict from './endpoints/user/UserRouteStrict'
import authRoute from './endpoints/user/AuthRoute'

dotenv.config()

const app: express.Express = express()
const port = process.env.PORT

startDB()

app.use(express.json())

app.use('/api/publicUsers', userRoute)

app.use('/api/authenticate', authRoute)

app.use('/api/users', userRouteStrict)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})