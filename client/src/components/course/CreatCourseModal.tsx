import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../features/authSlice"
import { CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

interface CreateCourseModalProps {
  showCreate: boolean
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
}

const editUniversityName = "CreateCourseComponentEditUniversityName"
const editUniversityShortName = "CreateCourseComponentEditUniversityShortName"
const editUniversityDepartmentName = "CreateCourseComponentEditDepartmentName"
const editName = "CreateCourseComponentEditName"
const editShortName = "CreateCourseComponentEditShortName"

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
    const universityName = (
      document.getElementById(editUniversityName) as HTMLInputElement
    ).value
    const universityShortName = (
      document.getElementById(editUniversityShortName) as HTMLInputElement
    ).value
    const departmentName = (
      document.getElementById(editUniversityDepartmentName) as HTMLInputElement
    ).value
    const name = (document.getElementById(editName) as HTMLInputElement).value
    const shortName =
      (document.getElementById(editShortName) as HTMLInputElement)?.value ?? ""

    //auslagern CourseService
    const createdCourse: CourseType = {
      universityName: universityName,
      universityShortName: universityShortName,
      departmentName: departmentName,
      name: name,
      shortName: shortName,
    }

    fetch(import.meta.env.VITE_SERVER_URL + "courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + authSlice.token,
      },
      body: JSON.stringify(createdCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data)
        if ("courseID" in data) setCourses([...courses, data])
        setShowCreate(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        navigate("/")
      })
  }
  return (
    <Modal show={showCreate} id="CourseManagementPageCreateComponent">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>courseId:</Form.Label>
              <Form.Control
                id="CreateCourseComponentEditCourseID"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>firstName:</Form.Label>
              <Form.Control
                id="CreateCourseComponentEditFirstName"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>lastName:</Form.Label>
              <Form.Control
                id="CreateCourseComponentEditLastName"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>password:</Form.Label>
              <Form.Control
                id="CreateCourseComponentEditPassword"
                type="password"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>is Administrator:</Form.Label>
              <Form.Switch
                id="CreateCourseComponentEditIsAdministrator"
                type="checkbox"
                placeholder=""
              />
            </Form.Group>
            <Button
              id="CreateCourseComponentCreateCourseButton"
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
