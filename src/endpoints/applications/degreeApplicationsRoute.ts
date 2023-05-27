import express from 'express'
import { isAdmin, isAuthorized } from '../utils'
import { cleanUser } from '../user/userRouteStrict'
import { cleanCourse } from '../degreeCourses/degreeRoute'
import * as applicationServices from './degreeApplicationService'
import * as courseServices from '../degreeCourses/degreeService'


const router = express.Router()

// router.get('/:applicantUserID', isAuthorized, (req: any, res: any) => {
//     res.send(`user id: ${req.params.applicantUserID}`)
// })

router.get('/', isAuthorized, isAdmin, async (req: express.Request, res: any) => {
    console.log('Getting applications.')
    console.log(req.query)

    const applications = await applicationServices.getManyApplications(req.query)

    res.send(applications)


    // const applications = await applicationServices.getAllApplications()
    // res.json(applications)
})

router.get('/myApplications', isAuthorized, async (req: any, res: any) => {
    // res.send('my applications')
    console.log('My Applications.')
    const userID = res.decodedUser.userID
    console.log(res.decodedUser)
    const applications = await applicationServices.getManyApplications({ applicantUserID: userID })
    res.json(applications)
})

router.post('/', isAuthorized, async (req: any, res: any) => {
    console.log('posting one.')
    const isAdmin = res.decodedUser.isAdministrator
    // console.log(res.decodedUser)

    let applicant: string
    if (isAdmin) {
        if ('applicantUserID' in req.body) {
            applicant = req.body.applicantUserID
        } else {
            applicant = res.decodedUser.userID
        }
    } else {
        applicant = res.decodedUser.userID
    }

    // check if course exists
    try {
        const course = await courseServices.getOneCourse(req.body.degreeCourseID)
    } catch (error) {
        return res.status(404).json({ Error: 'Course not found.'})
    }
    // if (!course) 

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
    application.save()
    res.send(application)
})

export default router