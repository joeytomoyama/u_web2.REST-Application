import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    universityName: {
        type: String,
        required: true
    },
    universityShortName: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    }
})

export default mongoose.model('Course', courseSchema)