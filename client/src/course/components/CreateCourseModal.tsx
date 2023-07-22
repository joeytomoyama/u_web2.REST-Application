import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
import { createCourse } from "../CourseService"

interface CreateCourseModalProps {
  showCreate: boolean
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
}

export default function CreateCourseModal({
  showCreate,
  setShowCreate,
  courses,
  setCourses,
}: CreateCourseModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    const createdCourse = createCourse()

    fetch(import.meta.env.VITE_SERVER_URL + "degreeCourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + authSlice.token,
      },
      body: JSON.stringify(createdCourse),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
      .then((data) => {
        console.log("data:", data)
        if ("id" in data) setCourses([...courses, data])
        setShowCreate(false)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
  }
  return (
    <Modal show={showCreate} id={IDS.DegreeCourseManagementPageCreateComponent}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>universityName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditUniversityName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityShortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditUniversityShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditDepartmentName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentShortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditDepartmentShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>name:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>shortName:</Form.Label>
              <Form.Control
                id={IDS.CreateDegreeCourseComponentEditShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Button
              id={IDS.CreateDegreeCourseComponentCreateDegreeCourseButton}
              variant="primary"
              onClick={handleFormSubmit}
            >
              Create Course
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
