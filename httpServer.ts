import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { startDB } from './db/Database'

import testRoutes from './endpoints/test/TestRoutes'
// import { start } from 'repl'

dotenv.config()

const app: express.Express = express()
const port = process.env.PORT

startDB()

// app.use(express.json())

app.use('/', testRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})