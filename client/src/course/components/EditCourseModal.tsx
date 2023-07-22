import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
import { editCourse } from "../CourseService"

interface EditCourseModalProps {
  showEdit: boolean
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
  clickedCourse: CourseType | undefined
}

export default function EditCourseModal({
  showEdit,
  setShowEdit,
  courses,
  setCourses,
  clickedCourse,
}: EditCourseModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleCourseEdit = (e: any) => {
    e.preventDefault()

    const editedCourse = editCourse()

    const editedCourseString = JSON.stringify(editedCourse)

    fetch(
      import.meta.env.VITE_SERVER_URL + "degreeCourses/" + clickedCourse?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + authSlice.token,
        },
        body: editedCourseString,
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
      .then((data) => {
        const newCourses = courses.map((course) => {
          if (course.id === clickedCourse?.id) {
            return { ...course, ...editedCourse }
          } else {
            return course
          }
        }) as CourseType[]
        setCourses(newCourses)
        setShowEdit(false)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
  }
  return (
    <Modal show={showEdit} id={IDS.DegreeCourseManagementPageEditComponent}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Edit Course: ${clickedCourse?.name} ${clickedCourse?.universityName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>id:</Form.Label>
              <Form.Control
                // own id, not in IDS:
                id="EditCourseComponentEditId"
                type="text"
                placeholder={clickedCourse?.id}
                disabled={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityName:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditUniversityName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityShortName:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditUniversityShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentName:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditDepartmentName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentShortName:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditDepartmentShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>name:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>shortName:</Form.Label>
              <Form.Control
                id={IDS.EditDegreeCourseComponentEditShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Button
              id={IDS.EditDegreeCourseComponentSaveDegreeCourseButton}
              variant="primary"
              onClick={handleCourseEdit}
            >
              Edit Course
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.OpenDegreeCourseManagementPageListComponentButton}
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
