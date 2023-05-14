import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdministrator: {
        type: Boolean,
        required: false,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    console.log('password modified')
    const salt = bcryptjs.genSaltSync()
    this.password = bcryptjs.hashSync(this.password, salt)
    next()
})

export default mongoose.model('User', userSchema)