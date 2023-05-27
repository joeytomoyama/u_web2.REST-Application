import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
        applicantUserID: {
            type: String,
            required: true // or?
        },
        degreeCourseID: {
            type: String,
            required: false
        },
        targetPeriodYear: {
            type: String,
            required: false
        },
        targetPeriodShortName: {
            type: String,
            required: false
        }
})

export default mongoose.model('Application', applicationSchema)