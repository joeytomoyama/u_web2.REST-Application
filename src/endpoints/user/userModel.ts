import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface UserInterface {
    userID: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    isAdministrator?: boolean
}

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
        required: false
    },
    lastName: {
        type: String,
        required: false
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

userSchema.methods.comparePW = async function(candidatePW: string) {//, next: Function) {
    const isAuthenticated = await bcryptjs.compare(candidatePW, this.password)
    return isAuthenticated
}

export default mongoose.model('User', userSchema)