import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { ApplicationType, CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
// import { applyCourse } from "../CourseService"

interface ApplyCourseModalProps {
  showApply: boolean
  setShowApply: React.Dispatch<React.SetStateAction<boolean>>
  clickedCourse: CourseType | undefined
  setClickedCourse: React.Dispatch<React.SetStateAction<CourseType | undefined>>
}

export default function ApplyCourseModal({
  showApply,
  setShowApply,
  clickedCourse,
  setClickedCourse,
}: ApplyCourseModalProps) {
  const authSlice: any = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleApplication = (e: any) => {
    e.preventDefault()

    const applicant = authSlice.body?.isAdministrator
      ? (
          document.getElementById(
            IDS.CreateDegreeCourseApplicationEditUserID,
          ) as HTMLInputElement
        )?.value
      : authSlice.body?.userID

    const application = {
      applicantUserID: applicant,
      degreeCourseID: clickedCourse?.id,
      targetPeriodYear: (
        document.getElementById(
          IDS.CreateDegreeCourseApplicationEditTargetPeriodYear,
        ) as HTMLInputElement
      )?.value,
      targetPeriodShortName: (
        document.getElementById(
          IDS.CreateDegreeCourseApplicationEditTargetPeriodName,
        ) as HTMLInputElement
      )?.value,
    }

    fetch(import.meta.env.VITE_SERVER_URL + "degreeCourseApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + authSlice.token,
      },
      body: JSON.stringify(application),
    })
      .then((response) => {
        // response.json()
        if (response.status === 201) setShowApply(false)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
    //   .then((data) => {
    //     console.log(data)
    //     setShowApply(false)
    //   })
  }
  return (
    <Modal show={showApply} id={IDS.CreateDegreeCourseApplicationCreate}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Apply to Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Degree Course ID:</Form.Label>
              <Form.Control
                id={"CreateDegreeCourseApplicationEditDegreeCourseID"}
                type="text"
                placeholder={`${clickedCourse?.shortName}: ${clickedCourse?.name}`}
                disabled={true}
              />
            </Form.Group>
            {authSlice.body?.isAdministrator ? (
              <Form.Group>
                <Form.Label>Applicant User ID:</Form.Label>
                <Form.Control
                  id={IDS.CreateDegreeCourseApplicationEditUserID}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label>Applicant User ID:</Form.Label>
                <Form.Control
                  id={IDS.CreateDegreeCourseApplicationEditUserID}
                  type="text"
                  placeholder={authSlice.body?.userID}
                  disabled={true}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Target Period Year:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseApplicationEditTargetPeriodYear}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Target Period Short Name:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseApplicationEditTargetPeriodName}
                as="select"
                placeholder=""
              >
                <option value="">Choose semester:</option>
                <option value="WiSe">Wintersemester</option>
                <option value="SoSe">Sommersemester</option>
              </Form.Control>
            </Form.Group>
            <Button
              id={IDS.CreateDegreeCourseApplicationCreateButton}
              variant="primary"
              onClick={handleApplication}
            >
              Apply to Course
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.OpenDegreeCourseManagementPageListComponentButton}
            onClick={() => setShowApply(false)}
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
