import Course from './degreeModel'

export async function getAllCourses(): Promise<Array<object>> {
    return await Course.find()
}

export async function getOneCourse(courseID: string) {
    return await Course.findOne({ _id: courseID })
}

export async function getManyCourses(filter: Record<any, any>) {
    const courses = await Course.find(filter)
    if (!courses) return null
    return courses
}

export async function postOneCourse(bodyCourse: Record<any, any>) {
    const course = new Course({
        universityName: bodyCourse.universityName,
        universityShortName: bodyCourse.universityShortName,
        departmentName: bodyCourse.departmentName,
        name: bodyCourse.name,
        id: bodyCourse.id,
        shortName: bodyCourse.shortName
    })
    return await course.save()
}

export async function updateOneCourse(courseID: string, newCourse: Record<any, any>) {
    const course = await getOneCourse(courseID)
    if (!course) return null

    Object.assign(course, newCourse)
    return await course.save()
}

export async function deleteOneCourse(courseID: string) {
    return await Course.deleteOne({ _id: courseID })
}