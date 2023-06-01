import express from 'express'

import { isAdmin, isAuthorized, cleanApplication, determineApplicant, checkCourseExists, checkApplicationIsValid } from '../utils'
import * as applicationServices from './degreeApplicationService'


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

router.get('/myApplications', isAuthorized, async (req: express.Request, res: any) => {
    console.log('My applications.')

    const userID = res.decodedUser.userID
    try {
        const applications = await applicationServices.getManyApplications({ applicantUserID: userID })
        res.status(200).json(cleanApplication(applications as Record<any, any>[]))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

router.post('/', isAuthorized, determineApplicant, checkCourseExists, checkApplicationIsValid, async (req: express.Request, res: any) => {
    console.log('posting one.')

    // post valid application
    try {
        const application = await applicationServices.postOneApplication({
            applicantUserID: res.applicant,
            degreeCourseID: req.body.degreeCourseID,
            targetPeriodYear: req.body.targetPeriodYear,
            targetPeriodShortName: req.body.targetPeriodShortName
        })
        res.status(201).json(cleanApplication(application))
    } catch (error: any) {
        if (error.name === "ValidationError") return res.status(400).json({ Error: 'Missing properties.' })
        res.status(500).json({ Erorr: error })
    }
})

router.put('/:id', isAuthorized, determineApplicant, checkCourseExists, checkApplicationIsValid, async (req: express.Request, res: any) => {
    console.log('putting one')
    if (req.body._id) return res.status(403).json({ Error: 'Changing application ID not allowed.' })

    const isAdmin = res.decodedUser.isAdministrator
    // if not admin and updating not self
    if (!isAdmin && req.params.id !== res.decodedUser.applicantUserID) return res.status(403).json({ Error: 'Not Allowed.' })

    try {
        const application = await applicationServices.updateOneApplication(req.params.id, req.body)
        if (!application) res.status(404).json({ Error: 'Not Found.'})
        res.status(200).json(cleanApplication(application as Record<any, any>))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

router.delete('/:id', isAuthorized, async (req: express.Request, res: any) => {
    console.log('delete one')
    const isAdmin = res.decodedUser.isAdministrator

    // check if application exists
    try {
        const application = await applicationServices.getOneApplication(req.params.id)
        // if application doesn't exist
        if (!application) return res.status(404).json({ Error: 'Application not found.' })
        // if not admin and updating not self
        if (!isAdmin && res.decodedUser.userID !== application.applicantUserID) return res.status(403).json({ Error: 'Not Allowed.' })
    } catch (error) {
        return res.status(500).json({ Error: error })
    }

    // delete application
    try {
        await applicationServices.deleteOneApplication(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ Error: error })
    }
})

export default router