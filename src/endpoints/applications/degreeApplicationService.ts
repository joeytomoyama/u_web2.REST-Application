import Application from './degreeApplicationModel'

export async function getAllApplications(): Promise<Array<object>> {
    return await Application.find()
}

export async function getOneApplication(applicationID: string) {
    return await Application.findOne({ _id: applicationID })
}

export async function getManyApplications(filter: Record<any, any>) {
    const applications = await Application.find(filter)
    if (!applications) return null
    return applications
}

export async function postOneApplication(bodyApplication: Record<string, string>) {
    const application = new Application({
        applicantUserID: bodyApplication.applicantUserID,
        degreeCourseID: bodyApplication.degreeCourseID,
        targetPeriodYear: bodyApplication.targetPeriodYear,
        targetPeriodShortName: bodyApplication.targetPeriodShortName
    })
    return await application.save()
}

export async function updateOneApplication(applicationID: string, newApplication: Record<any, any>) { // Object.assign(obj1, obj2)
    const application = await getOneApplication(applicationID)
    if (!application) return null
    if (newApplication.applicantUserID) application.applicantUserID = newApplication.applicantUserID
    if (newApplication.degreeCourseID) application.degreeCourseID = newApplication.degreeCourseID
    if (newApplication.targetPeriodYear) application.targetPeriodYear = newApplication.targetPeriodYear
    if (newApplication.targetPeriodShortName) application.targetPeriodShortName = newApplication.targetPeriodShortName
    return await application.save()
}

export async function deleteOneApplication(applicationID: string) {
    return await Application.deleteOne({ _id: applicationID })
}