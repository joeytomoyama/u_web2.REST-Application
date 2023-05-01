import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DATABASE_URL

export function startDB() {
    console.log(`Connecting to database ${url}`)
    if (url) mongoose.connect(url)
    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('Connected to Database'))
}