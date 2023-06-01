import jwt from 'jsonwebtoken'
import express from 'express'

import * as applicationServices from './applications/degreeApplicationService'
import * as courseServices from './degreeCourses/degreeService'
import * as userServices from './user/userService'

export function isAuthorized(req: express.Request, res: any, next: Function) {
    if (!req.headers.authorization) return res.status(401).json({ Error: 'Not Authorized.' })
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

export function isAdmin(req: express.Request, res: any, next: Function) {
    if (!res.decodedUser.isAdministrator) return res.status(403).json({ Error: 'You are not an administrator.' })
    next()
}

export function idProvided(req: express.Request, res: any, next: Function) { // kinda useless function. if no id, route is not entered.
    if (!req.params.id) return res.status(400).json({ Error: 'ID missing.' })
    next()
}

// determine who is being applied
export async function determineApplicant(req: express.Request, res: any, next: Function) {
    const isAdmin = res.decodedUser.isAdministrator
    if (isAdmin) {
        if ('applicantUserID' in req.body) {    // admin posting a user
            res.applicant = req.body.applicantUserID
            try {   // check if user exists
                const user = await userServices.getOneUser(res.applicant)
                if (!user) return res.status(404).json({ Error: 'Applicant not found.' })
            } catch (error) {
                res.status(500).json({ Error: error })
            }
        } else {                                // admin posting self
            res.applicant = res.decodedUser.userID
        }
    } else {                                    // user posting self
        if (req.body.applicantUserID && req.body.applicantUserID !== res.decodedUser.userID) return res.status(403).json({ Error: 'Not Allowed.' })
        res.applicant = res.decodedUser.userID
    }
    next()
}

// check if course exists
export async function checkCourseExists(req: express.Request, res: any, next: Function) {
    if (!req.body.degreeCourseID) return next()
    
    try {
        const course = await courseServices.getOneCourse(req.body.degreeCourseID)
        if (!course) return res.status(404).json({ Error: 'Course doesn\'t exist' })
    } catch (error: any) {
        if (error.name === 'CastError') return res.status(404).json({ Error: 'Course doesn\'t exist' })
        return res.status(500).json({ Error: error })
    }
    next()
}

// check if applicant has existing application for given course.
export async function checkApplicationIsValid(req: express.Request, res: any, next: Function) {
    try {
        const existingCourses = await applicationServices.getManyApplications({
            applicantUserID: res.applicant,
            degreeCourseID: req.body.degreeCourseID
        })
        if (existingCourses && existingCourses.length > 0) return res.status(400).json({ Error: 'Already applied to course.'})
    } catch (error) {
        res.status(500).json({ Erorr: error })
    }
    next()
}


// CLEANING FUNCTIONS
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