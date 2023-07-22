import * as IDS from "../ids"
import { CourseType } from "../types"

export function createCourse(): CourseType {
  const universityName = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditUniversityName,
    ) as HTMLInputElement
  )?.value
  const universityShortName = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditUniversityShortName,
    ) as HTMLInputElement
  )?.value
  const departmentName = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditDepartmentName,
    ) as HTMLInputElement
  )?.value
  const departmentShortName = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditDepartmentShortName,
    ) as HTMLInputElement
  )?.value
  const name = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditName,
    ) as HTMLInputElement
  )?.value
  const shortName = (
    document.getElementById(
      IDS.CreateDegreeCourseComponentEditShortName,
    ) as HTMLInputElement
  )?.value

  const createdCourse: CourseType = {
    universityName: universityName,
    universityShortName: universityShortName,
    departmentName: departmentName,
    departmentShortName: departmentShortName,
    name: name,
    shortName: shortName,
  }

  return createdCourse
}

export function editCourse(): CourseType {
  const universityName =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditUniversityName,
      ) as HTMLInputElement
    )?.value ?? ""
  const universityShortName =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditUniversityShortName,
      ) as HTMLInputElement
    )?.value ?? ""
  const departmentName =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditDepartmentName,
      ) as HTMLInputElement
    )?.value ?? ""
  const departmentShortName =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditDepartmentShortName,
      ) as HTMLInputElement
    )?.value ?? ""
  const name =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditName,
      ) as HTMLInputElement
    )?.value ?? ""
  const shortName =
    (
      document.getElementById(
        IDS.EditDegreeCourseComponentEditShortName,
      ) as HTMLInputElement
    )?.value ?? ""

  const editedCourse: CourseType | Record<any, any> = {}
  if (universityName) editedCourse.universityName = universityName
  if (universityShortName)
    editedCourse.universityShortName = universityShortName
  if (departmentName) editedCourse.departmentName = departmentName
  if (departmentShortName)
    editedCourse.departmentShortName = departmentShortName
  if (name) editedCourse.name = name
  if (shortName) editedCourse.shortName = shortName

  return editedCourse as CourseType
}
