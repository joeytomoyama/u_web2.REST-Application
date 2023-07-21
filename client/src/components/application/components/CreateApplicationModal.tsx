import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { ApplicationType } from "../../../types"
import { useAppSelector } from "../../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../../ids"

interface CreateApplicationModalProps {
  showCreate: boolean
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
  applications: ApplicationType[]
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>
}

export default function CreateApplicationModal({
  showCreate,
  setShowCreate,
  applications,
  setApplications,
}: CreateApplicationModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    const createdApplication = createApplication()

    fetch(import.meta.env.VITE_SERVER_URL + "degreeApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + authSlice.token,
      },
      body: JSON.stringify(createdApplication),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
      .then((data) => {
        console.log("data:", data)
        if ("id" in data) setApplications([...applications, data])
        setShowCreate(false)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
  }
  return (
    <Modal
      show={showCreate}
      id={IDS.DegreeApplicationManagementPageCreateComponent}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>universityName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditUniversityName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityShortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditUniversityShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditDepartmentName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentShortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditDepartmentShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>name:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>shortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeApplicationComponentEditShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Button
              id={
                IDS.CreateDegreeApplicationComponentCreateDegreeApplicationButton
              }
              variant="primary"
              onClick={handleFormSubmit}
            >
              Create Application
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowCreate(false)} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
