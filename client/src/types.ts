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
  departmentShortName: string
  name: string
  shortName: string
  id?: string
}

export interface ApplicationType {
  applicantUserID: string
  degreeCourseID: string
  targetPeriodYear: string
  targetPeriodShortName: string
  id: string
}
