import express from 'express'
import { isAdmin, isAuthorized, cleanApplication } from '../utils'
import * as applicationServices from './degreeApplicationService'
import * as courseServices from '../degreeCourses/degreeService'
import * as userServices from '../user/userService'


const router = express.Router()

router.get('/', isAuthorized, isAdmin, async (req: express.Request, res: express.Response) => {
    console.log('Getting applications.')

    try {
        const applications = await applicationServices.getManyApplications(req.query)
        if (!applications) return res.status(500).json({ Error: 'Something went wrong.'})
        res.status(200).json(cleanApplication(applications as Record<any, any>[]))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

router.get('/myApplications', isAuthorized, async (req: any, res: any) => {
    console.log('My applications.')
    const userID = res.decodedUser.userID
    try {
        const applications = await applicationServices.getManyApplications({ applicantUserID: userID })
        res.status(200).json(cleanApplication(applications as Record<any, any>[]))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

router.post('/', isAuthorized, async (req: any, res: any) => {
    console.log('posting one.')
    const isAdmin = res.decodedUser.isAdministrator

    // check who is being applied
    let applicant: string
    if (isAdmin) {
        if ('applicantUserID' in req.body) {    // admin posting a user
            applicant = req.body.applicantUserID
            try {   // check if user exists
                const user = await userServices.getOneUser(applicant)
                if (!user) return res.status(404).json({ Error: 'Applicant not found.' })
            } catch (error) {
                res.status(500).json({ Error: error })
            }
        } else {                                // admin posting self
            applicant = res.decodedUser.userID
        }
    } else {                                    // user posting self
        applicant = res.decodedUser.userID
    }

    // check if course exists
    try {
        const course = await courseServices.getOneCourse(req.body.degreeCourseID)
        if (!course) return res.status(404).json({ Error: 'Course not found.'})
    } catch (error: any) {
        if (error.name === 'CastError') return res.status(404).json({ Error: 'Course not found.' })
        return res.status(500).json({ Error: error })
    }

    // check if applicant has existing application for given course.
    try {
        const existingCourses = await applicationServices.getManyApplications({
            applicantUserID: applicant,
            degreeCourseID: req.body.degreeCourseID
        })
        if (existingCourses && existingCourses.length > 0) return res.status(400).json({ Error: 'Already applied to course.'})
    } catch (error) {
        res.status(500).json({ Erorr: error })
    }

    // post valid application
    try {
        const application = await applicationServices.postOneApplication({
            applicantUserID: applicant,
            degreeCourseID: req.body.degreeCourseID,
            targetPeriodYear: req.body.targetPeriodYear,
            targetPeriodShortName: req.body.targetPeriodShortName
        })
        res.status(200).json(cleanApplication(application))
    } catch (error) {
        res.status(500).json({ Erorr: error })
    }
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    console.log('putting one')
    try {
        const application = await applicationServices.updateOneApplication(req.params.id, req.body)
        if (!application) res.status(404).json({ Error: 'Not Found.'})
        res.status(200).json(cleanApplication(application as Record<any, any>))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    console.log('delete one')
    try {
        await applicationServices.deleteOneApplication(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

export default router