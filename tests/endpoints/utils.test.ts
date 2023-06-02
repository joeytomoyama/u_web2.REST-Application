import { cleanUser, cleanCourse, cleanApplication } from '../../src/endpoints/utils'

describe('cleanUser', () => {
    it('should clean a single user', () => {
        const user = {
            userID: '123',
            firstName: 'John',
            lastName: 'Doe',
            isAdministrator: true
        }
  
        const result = cleanUser(user)
    
        expect(result).toEqual({
            userID: '123',
            firstName: 'John',
            lastName: 'Doe',
            isAdministrator: true
        })
    })
  
    it('should clean an array of users', () => {
        const users = [
            {
                userID: '123',
                firstName: 'John',
                lastName: 'Doe',
                isAdministrator: true
            },
            {
                userID: '456',
                firstName: 'Jane',
                lastName: 'Smith',
                isAdministrator: false
            }
        ]
  
        const result = cleanUser(users)
  
        expect(result).toEqual([
            {
                userID: '123',
                firstName: 'John',
                lastName: 'Doe',
                isAdministrator: true
            },
            {
                userID: '456',
                firstName: 'Jane',
                lastName: 'Smith',
                isAdministrator: false
            }
        ])
    })
})

describe('cleanCourse', () => {
    it('should clean a single course', () => {
        const course = {
            universityName: 'Example University',
            universityShortName: 'EUNIV',
            departmentName: 'Computer Science',
            departmentShortName: 'CS',
            name: 'Introduction to Programming',
            _id: '123',
            shortName: 'Intro to Programming'
        }

        const result = cleanCourse(course)

        expect(result).toEqual({
            universityName: 'Example University',
            universityShortName: 'EUNIV',
            departmentName: 'Computer Science',
            departmentShortName: 'CS',
            name: 'Introduction to Programming',
            id: '123',
            shortName: 'Intro to Programming'
        })
    })

    it('should clean an array of courses', () => {
        const courses = [
            {
                universityName: 'Example University',
                universityShortName: 'EUNIV',
                departmentName: 'Computer Science',
                departmentShortName: 'CS',
                name: 'Introduction to Programming',
                _id: '123',
                shortName: 'Intro to Programming'
            },
            {
                universityName: 'Another University',
                universityShortName: 'AUNIV',
                departmentName: 'Mathematics',
                departmentShortName: 'MATH',
                name: 'Calculus',
                _id: '456',
                shortName: 'Calculus'
            }
        ]

        const result = cleanCourse(courses)

        expect(result).toEqual([
            {
                universityName: 'Example University',
                universityShortName: 'EUNIV',
                departmentName: 'Computer Science',
                departmentShortName: 'CS',
                name: 'Introduction to Programming',
                id: '123',
                shortName: 'Intro to Programming'
            },
            {
                universityName: 'Another University',
                universityShortName: 'AUNIV',
                departmentName: 'Mathematics',
                departmentShortName: 'MATH',
                name: 'Calculus',
                id: '456',
                shortName: 'Calculus'
            }
        ])
    })
})

describe('cleanApplication', () => {
    it('should clean a single application', () => {
        const application = {
            applicantUserID: '123',
            degreeCourseID: '456',
            targetPeriodYear: '2023',
            targetPeriodShortName: 'Spring',
            _id: '789'
        }

        const result = cleanApplication(application)

        expect(result).toEqual({
            applicantUserID: '123',
            degreeCourseID: '456',
            targetPeriodYear: '2023',
            targetPeriodShortName: 'Spring',
            id: '789'
        })
    })

    it('should clean an array of applications', () => {
        const applications = [
            {
                applicantUserID: '123',
                degreeCourseID: '456',
                targetPeriodYear: '2023',
                targetPeriodShortName: 'Spring',
                _id: '789'
            },
            {
                applicantUserID: '456',
                degreeCourseID: '789',
                targetPeriodYear: '2022',
                targetPeriodShortName: 'Fall',
                _id: '123'
            }
        ]

        const result = cleanApplication(applications)

        expect(result).toEqual([
            {
                applicantUserID: '123',
                degreeCourseID: '456',
                targetPeriodYear: '2023',
                targetPeriodShortName: 'Spring',
                id: '789'
            },
            {
                applicantUserID: '456',
                degreeCourseID: '789',
                targetPeriodYear: '2022',
                targetPeriodShortName: 'Fall',
                id: '123'
            }
        ])
    })
})