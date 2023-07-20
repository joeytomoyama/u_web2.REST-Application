export interface UserType {
  userID?: string
  firstName?: string
  lastName?: string
  password?: string
  isAdministrator?: boolean
}

export interface CourseType {
  universityName: string
  universityShortName: string
  departmentName: string
  name: string
  shortName: string
  id: string
}

export interface ApplicationType {
  userID: string
  degreeCourseID: string
  status: string
  date: string
  id: string
}
