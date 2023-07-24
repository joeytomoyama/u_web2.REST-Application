import { ApplicationType } from "../types"

export function editApplication(): ApplicationType {
  const applicantID =
    (
      document.getElementById(
        "EditDegreeCourseApplicationComponentEditApplicantID",
      ) as HTMLInputElement
    )?.value ?? ""
  const degreeCourseID =
    (
      document.getElementById(
        "EditDegreeCourseApplicationComponentEditDegreeCourseID",
      ) as HTMLInputElement
    )?.value ?? ""
  const targetPeriodYear =
    (
      document.getElementById(
        "EditDegreeCourseApplicationComponentEditTargetYear",
      ) as HTMLInputElement
    )?.value ?? ""
  const targetPeriodShortName =
    (
      document.getElementById(
        "EditDegreeCourseApplicationComponentEditTargetPeriodShortName",
      ) as HTMLInputElement
    )?.value ?? ""

  const editedApplication: ApplicationType | Record<any, any> = {}
  if (applicantID) editedApplication.applicantID = applicantID
  if (degreeCourseID) editedApplication.degreeCourseID = degreeCourseID
  if (targetPeriodYear) editedApplication.targetPeriodYear = targetPeriodYear
  if (targetPeriodShortName)
    editedApplication.targetPeriodShortName = targetPeriodShortName

  return editedApplication as ApplicationType
}
