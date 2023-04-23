import express from 'express'

import testRoutes from './endpoints/test/TestRoutes'

const app: express.Express = express()
const port: number = 8080

app.use('/', testRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})