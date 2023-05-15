import Course from './degreeModel'

export async function getAllCourses(): Promise<Array<object>> {
    return await Course.find()
}

export async function getOneCourse(courseID: string) {
    return await Course.findOne({ _id: courseID })
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
    if (newCourse.universityName) course.universityName = newCourse.universityName
    if (newCourse.universityShortName) course.universityShortName = newCourse.universityShortName
    if (newCourse.departmentName) course.departmentName = newCourse.departmentName
    if (newCourse.name) course.name = newCourse.name
    if (newCourse.id) course.id = newCourse.id
    if (newCourse.shortName) course.shortName = newCourse.shortName
    return await course.save()
}

export async function deleteOneCourse(courseID: string) {
    return await Course.deleteOne({ id: courseID })
}