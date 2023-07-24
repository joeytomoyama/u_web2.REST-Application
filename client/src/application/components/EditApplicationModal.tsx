import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { ApplicationType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
import { editApplication } from "../ApplicationService"

interface EditApplicationModalProps {
  showEdit: boolean
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  applications: ApplicationType[]
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>
  clickedApplication: ApplicationType | undefined
}

export default function EditApplicationModal({
  showEdit,
  setShowEdit,
  applications,
  setApplications,
  clickedApplication,
}: EditApplicationModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleApplicationEdit = (e: any) => {
    e.preventDefault()

    const editedApplication = editApplication()

    const editedApplicationString = JSON.stringify(editedApplication)

    fetch(
      import.meta.env.VITE_SERVER_URL +
        "degreeCourseApplications/" +
        clickedApplication?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + authSlice.token,
        },
        body: editedApplicationString,
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
      .then((data) => {
        const newApplications = applications.map((application) => {
          if (application.id === clickedApplication?.id) {
            return { ...application, ...editedApplication }
          } else {
            return application
          }
        }) as ApplicationType[]
        setApplications(newApplications)
        setShowEdit(false)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
  }
  return (
    <Modal
      show={showEdit}
      id="DegreeCourseApplicationManagementPageEditComponent"
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Edit Application for : ${clickedApplication?.applicantUserID} for this course: ${clickedApplication?.degreeCourseID}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>id:</Form.Label>
              <Form.Control
                // own id, not in IDS:
                id="EditApplicationComponentEditId"
                type="text"
                placeholder={clickedApplication?.id}
                disabled={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>applicant ID:</Form.Label>
              <Form.Control
                id="EditDegreeCourseApplicationComponentEditApplicantID"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Degree Course ID:</Form.Label>
              <Form.Control
                id="EditDegreeCourseApplicationComponentEditDegreeCourseID"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Target Year:</Form.Label>
              <Form.Control
                id="EditDegreeCourseApplicationComponentEditTargetYear"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Target Period Short Name:</Form.Label>
              <Form.Control
                id="EditDegreeCourseApplicationComponentEditTargetPeriodShortName"
                type="text"
                placeholder=""
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>name:</Form.Label>
              <Form.Control
                // id={IDS.EditDegreeCourseApplicationComponentEditName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>shortName:</Form.Label>
              <Form.Control
                // id={IDS.EditDegreeCourseApplicationComponentEditShortName}
                type="text"
                placeholder=""
              />
            </Form.Group> */}
            <Button
              id="EditDegreeCourseApplicationComponentSaveDegreeCourseApplicationButton"
              variant="primary"
              onClick={handleApplicationEdit}
            >
              Edit Application
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.DeleteDialogCancelButton}
            onClick={() => setShowEdit(false)}
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
