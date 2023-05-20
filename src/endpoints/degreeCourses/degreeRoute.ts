import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import * as Services from './degreeService'
import { isAuthorized, isAdmin, idProvided } from '../middleware'

const router = express.Router()

dotenv.config()

// Getting all
router.get('/', isAuthorized, async (req: any, res: any) => {
    console.log('getting all')
    if (Object.values(req.query).length > 0) {
        try {
            const courses = await Services.getManyCourses(req.query)
            if (!courses) return res.status(500).json({ Error: 'Something went wrong.' })
            if (courses.length > 0) {
                return res.send(cleanCourse(courses as Record<string, any>))
            } else {
                return res.status(404).json({ Error: 'Nothing found.' })
            }
        } catch(error: any) {
            return res.status(500).json({ Error: error })
        }
    }
    try {
        const courses = await Services.getAllCourses()
        res.status(200).send(cleanCourse(courses))
    } catch (error: any) {
        res.status(500).json({ Error: error })
    }
})

// Getting one
router.get('/:id', isAuthorized, idProvided, async (req: any, res: any) => {
    console.log('getting one')
        try {
            const course = await Services.getOneCourse(req.params.id)
            if (course) {
                res.status(200).json(cleanCourse(course))
            } else {
                res.status(404).json({ Error: 'Course not found' })
            }
        } catch (error:any) {
            res.status(500).json({ Error: error })
        }
})

// Creating one
router.post('/', isAuthorized, isAdmin, async (req: any, res: any) => {
    console.log('creating one')
    try {
        const course = await Services.postOneCourse(req.body)
        res.status(201).json(cleanCourse(course))
    } catch(error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate ID not allowed.' })
        } else if (error.name === "ValidationError") {
            res.status(400).json({ message: 'Required property missing.' }) 
        } else {
            res.status(500).json({ Error: error })
        }
    }
})

// Updating one
router.put('/:id', isAuthorized, isAdmin, idProvided, async (req: any, res: any) => {
    console.log('updating one')
    if (req.body.id) return res.status(400).json({ Error: 'Changing course ID not allowed.' })

    try {
        const updatedCourse = await Services.updateOneCourse(req.params.id, req.body)
        if (updatedCourse) {
            res.status(200).json(cleanCourse(updatedCourse))
        } else {
            res.status(404).json({ message: 'Course not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error })
    }
})

// Deleting one
router.delete('/:id', isAuthorized, isAdmin, idProvided, async (req: any, res: any) => {
    console.log('deleting one')
    try {
        const deleted = await Services.deleteOneCourse(req.params.id)
        if (deleted.deletedCount > 0) {
            res.sendStatus(204) // .json(`Course ${req.params.id} deleted.`) // no body
        } else {
            res.status(404).json(`Course ${req.params.id} not found.`)
        }
    } catch(error: any) {
        res.status(500).json({ Error: error })
    }
})

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

export default router