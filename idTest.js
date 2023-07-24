const fs = require("fs")
const path = require("path")

// import fs from "fs"
// import path from "path"

const projectPath = "./client/src"  // change path to your project

const requiredComponentIds = [
  "LandingPage",
  "OpenLoginDialogButton",
  "LoginDialog",
  "LoginDialogUserIDText",
  "LoginDialogPasswordText",
  "PerformLoginButton",
  "LogoutButton",
  "OpenStartPageButton",
  "OpenUserManagementPageButton",
  "OpenDegreeCourseManagementPageButton",
  "OpenDegreeCourseApplicationManagementPageButton",
  "StartPage",
  "UserManagementPage",
  "DegreeCourseManagementPage",
  "DegreeCourseApplicationManagementPage",
  "UserManagementPageListComponent",
  "UserManagementPageCreateUserButton",
  "UserItem",
  "UserID",
  "FirstName",
  "LastName",
  "UserItemEditButton",
  "UserItemDeleteButton",
  "UserManagementPageCreateComponent",
  "CreateUserComponentEditUserID",
  "CreateUserComponentEditFirstName",
  "CreateUserComponentEditLastName",
  "CreateUserComponentEditPassword",
  "CreateUserComponentEditIsAdministrator",
  "CreateUserComponentCreateUserButton",
  "UserManagementPageEditComponent",
  "EditUserComponentEditUserID",
  "EditUserComponentEditFirstName",
  "EditUserComponentEditLastName",
  "EditUserComponentEditPassword",
  "EditUserComponentEditIsAdministrator",
  "EditUserComponentSaveUserButton",
  "OpenUserManagementPageListComponentButton",
  "OpenDegreeCourseManagementPage",
  "DegreeCourseManagementPageListComponent",
  "DegreeCourseManagementPageCreateDegreeCourseButton",
  "DegreeCourseItem",
  "UniversityName",
  "DepartmentName",
  "Name",
  "DegreeCourseItemEditButton",
  "DegreeCourseItemDeleteButton",
  "DegreeCourseManagementPageCreateComponent",
  "CreateDegreeCourseComponentEditName",
  "CreateDegreeCourseComponentEditShortName",
  "CreateDegreeCourseComponentEditUniversityName",
  "CreateDegreeCourseComponentEditUniversityShortName",
  "CreateDegreeCourseComponentEditDepartmentName",
  "CreateDegreeCourseComponentEditDepartmentShortName",
  "CreateDegreeCourseComponentCreateDegreeCourseButton",
  "OpenDegreeCourseManagementPageListComponentButton",
  "DegreeCourseManagementPageEditComponent",
  "EditDegreeCourseComponentEditName",
  "EditDegreeCourseComponentEditShortName",
  "EditDegreeCourseComponentEditUniversityName",
  "EditDegreeCourseComponentEditUniversityShortName",
  "EditDegreeCourseComponentEditDepartmentName",
  "EditDegreeCourseComponentEditDepartmentShortName",
  "EditDegreeCourseComponentSaveDegreeCourseButton",
  "CreateDegreeCourseApplicationForDegreeCourse",
  "CreateDegreeCourseApplicationEditUserID",
  "CreateDegreeCourseApplicationEditTargetPeriodYear",
  "CreateDegreeCourseApplicationEditTargetPeriodName",
  "CreateDegreeCourseApplicationCreate",
  "DegreeCourseApplicationManagementPageListComponent",
  "DegreeCourseApplicationItem",
  "ApplicantUserID",
  "DegreeCourseName",
  "TargetPeriodYear",
  "TargetPeriodShortName",
  "UniversityShortName",
  "DegreeCourseApplicationItemDeleteButton",
  "DegreeCourseApplicationDeleteButton",
  "DeleteDialog",
  "DeleteDialogUser",
  "DeleteDialogDegreeCourse",
  "DeleteDialogDegreeCourseApplication",
  "DeleteDialogConfirmButton",
  "DeleteDialogCancelButton",
]

function searchInDirectory(dir, pattern) {
  let results = []

  fs.readdirSync(dir).forEach((dirInner) => {
    dirInner = path.resolve(dir, dirInner)
    const stat = fs.statSync(dirInner)

    if (stat.isDirectory()) {
      results = results.concat(searchInDirectory(dirInner, pattern))
    } else if (
      stat.isFile() &&
      (dirInner.endsWith(".js") ||
        dirInner.endsWith(".jsx") ||
        // dirInner.endsWith(".ts") ||
        dirInner.endsWith(".tsx"))
    ) {
      const content = fs.readFileSync(dirInner, "utf8")
      if (content.includes(pattern)) {
        results.push(dirInner)
      }
    }
  })

  return results
}

const notFoundIds = []

console.log("found:")
requiredComponentIds.forEach((id) => {
  const matches = searchInDirectory(projectPath, id)
  if (matches.length === 0) {
    notFoundIds.push(id)
  } else {
    console.log(`ID "${id}" found in the following files: `, matches)
  }
})

console.log()
console.log("not found:")
notFoundIds.forEach(id => console.error(id))