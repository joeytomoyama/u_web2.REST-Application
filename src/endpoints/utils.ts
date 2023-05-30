import jwt from 'jsonwebtoken'
import * as applicationServices from './applications/degreeApplicationService'
import * as courseServices from './degreeCourses/degreeService'
import * as userServices from './user/userService'

export function isAuthorized(req: any, res: any, next: Function) {
    if (!req.headers.authorization) return res.status(401).json({ Error: 'Please enter a Token.' })
    const token = req.headers.authorization.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret)
        const decodedObject = decode as jwt.JwtPayload
        console.log(decodedObject)
        res.decodedUser = decodedObject
    } catch (error: any) {
        return res.status(401).json({ Error: error })
    }
    next()
}

export function isAdmin(req: any, res: any, next: Function) {
    if (!res.decodedUser.isAdministrator) return res.status(403).json({ Error: 'You are not an administrator.' })
    next()
}

export function idProvided(req: any, res: any, next: Function) { // kinda useless function. if no id, route is not entered.
    if (!req.params.id) return res.status(400).json({ Error: 'ID missing.' })
    next()
}

// TODO
export function checkUserExists(req: any, res: any, next: Function) {
    next()
}

export function checkCourseExists(req: any, res: any, next: Function) {
    next()
}

export function checkApplicationExists(req: any, res: any, next: Function) {
    next()
}

// CLEANING FUNCTION
export function cleanUser(user: Record<any, any> | Record<any, any>[]): object | object[] {
    if (Array.isArray(user)) {
        const users = user
        const cleanUsers: Record<any, any>[] = users.map((user) => ({
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdministrator: user.isAdministrator
          }));
        return cleanUsers
    } else {
        const cleanUser: Record<any, any> = {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdministrator: user.isAdministrator
        }
        return cleanUser
    }
}

export function cleanCourse(course: Record<any, any> | Record<any, any>[]): object | object[] {
    if (Array.isArray(course)) {
        const courses = course
        const cleanCourses: Record<any, any>[] = courses.map((course) => ({
            universityName: course.universityName,
            universityShortName: course.universityShortName,
            departmentName: course.departmentName,
            departmentShortName: course.departmentShortName,
            name: course.name,
            id: course._id,
            shortName: course.shortName
        }))
        return cleanCourses
    } else {
        const cleanCourse: Record<any, any> = {
            universityName: course.universityName,
            universityShortName: course.universityShortName,
            departmentName: course.departmentName,
            departmentShortName: course.departmentShortName,
            name: course.name,
            id: course._id,
            shortName: course.shortName
        }
        return cleanCourse
    }
}

export function cleanApplication(application: Record<any, any> | Record<any, any>[]): object | object[] {
    if (Array.isArray(application)) {
        const applications = application
        const cleanApplications: Record<any, any>[] = applications.map((application) => ({
            applicantUserID: application.applicantUserID,
            degreeCourseID: application.degreeCourseID,
            targetPeriodYear: application.targetPeriodYear,
            targetPeriodShortName: application.targetPeriodShortName,
            id: application._id
        }))
        return cleanApplications
    } else {
        const cleanApplication: Record<any, any> = {
            applicantUserID: application.applicantUserID,
            degreeCourseID: application.degreeCourseID,
            targetPeriodYear: application.targetPeriodYear,
            targetPeriodShortName: application.targetPeriodShortName,
            id: application._id
        }
        return cleanApplication
    }
}