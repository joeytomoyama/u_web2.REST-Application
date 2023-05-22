import express from 'express'
import { isAuthorized } from '../middleware'
import * as Services from './degreeApplicationService'

const router = express.Router()

// router.get('/:applicantUserID', isAuthorized, (req: any, res: any) => {
//     res.send(`user id: ${req.params.applicantUserID}`)
// })

router.get('/', isAuthorized, (req: express.Request, res: any) => {
    res.send('degree applications.' + req.query)
})

router.get('/myApplications', (req: any, res: any) => {
    res.send('my applications')
})

router.post('/', isAuthorized, (req: any, res: any) => {
    const isAdmin = res.decodedUser.isAdministrator

    let applicant: string
    if (isAdmin) {
        console.log(req.decodedUser.id)
        if ('applicantUserID' in req.body) {
            applicant = req.body.applicantUserID
        } else {
            applicant = res.decodedUser.id
        }
    } else {
        applicant = res.decodedUser.id
    }

    Services.postOneApplication({
        applicantUserID: applicant,
        degreeCourseID: req.body.degreeCourseID,
        year: req.body.year,
        targetPeriodShortName: req.body.targetPeriodShortName
    })
})

export default router