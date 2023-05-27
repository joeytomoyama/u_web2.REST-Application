import express from 'express'
import { isAdmin, isAuthorized, cleanApplication } from '../utils'
import * as applicationServices from './degreeApplicationService'
import * as courseServices from '../degreeCourses/degreeService'
import * as userServices from '../user/userService'


const router = express.Router()

router.get('/', isAuthorized, isAdmin, async (req: express.Request, res: express.Response) => {
    console.log('Getting applications.')

    // if (Object.values(req.query).length > 0) {
        try {
            const applications = await applicationServices.getManyApplications(req.query)
            if (!applications) return res.json({ Error: 'Something went wrong.'})
            res.json(cleanApplication(applications as Record<any, any>[]))
        } catch (error) {
            res.json({ Error: error })
        }
    // } else {
    //     try {
    //         const applications = await applicationServices.getAllApplications()
    //         res.status(200).json(applications)
    //     } catch (error) {
    //         res.json({ Error: error })
    //     }
    // }
})

router.get('/myApplications', isAuthorized, async (req: any, res: any) => {
    console.log('My Applications.')
    const userID = res.decodedUser.userID
    console.log(res.decodedUser)
    const applications = await applicationServices.getManyApplications({ applicantUserID: userID })
    res.json(cleanApplication(applications as Record<any, any>[]))
})

router.post('/', isAuthorized, async (req: any, res: any) => {
    console.log('posting one.')
    const isAdmin = res.decodedUser.isAdministrator

    let applicant: string
    if (isAdmin) {
        if ('applicantUserID' in req.body) {
            // admin posting a user
            applicant = req.body.applicantUserID
            try {
                const user = await userServices.getOneUser(applicant)
                if (!user) return res.status(404).json({ Error: 'Applicant not found.' })
            } catch (error) {
                res.json({ Error: error })
            }
        } else {
            // admin posting self
            applicant = res.decodedUser.userID
        }
    } else {
        // user posting self
        applicant = res.decodedUser.userID
    }

    // check if course exists
    try {
        const course = await courseServices.getOneCourse(req.body.degreeCourseID)
        if (!course) return res.status(404).json({ Error: 'Course not found.'})
    } catch (error) {
        return res.status(404).json({ Error: 'Course not found.'})
    }

    // check if applicant has existing application for given Course.
    const existingCourses = await applicationServices.getManyApplications({
        applicantUserID: applicant,
        degreeCourseID: req.body.degreeCourseID
    })
    if (existingCourses) console.log(existingCourses.length)
    if (existingCourses && existingCourses.length > 0) return res.json({ Error: 'Already applied to course.'})

    // post valid application
    const application = await applicationServices.postOneApplication({
        applicantUserID: applicant,
        degreeCourseID: req.body.degreeCourseID,
        targetPeriodYear: req.body.targetPeriodYear,
        targetPeriodShortName: req.body.targetPeriodShortName
    })

    res.status(200).json(cleanApplication(application))
})

router.put('/:id', async (req: express.Request, res: express.Response) => {
    console.log('putting one')
    try {
        const application = await applicationServices.updateOneApplication(req.params.id, req.body)
        if (!application) res.json({ Error: 'Not Found.'})
        res.json(cleanApplication(application as Record<any, any>))
    } catch (error) {
        res.json({ Error: error })
    }
})

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    console.log('delete one')
    try {
        const application = await applicationServices.deleteOneApplication(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.json({ Error: error })
    }
})

export default router