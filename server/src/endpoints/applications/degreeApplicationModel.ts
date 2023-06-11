import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
        applicantUserID: {
            type: String,
            required: true // or?
        },
        degreeCourseID: {
            type: String,
            required: true
        },
        targetPeriodYear: {
            type: String,
            required: true
        },
        targetPeriodShortName: {
            type: String,
            required: false
        }
})

export default mongoose.model('Application', applicationSchema)