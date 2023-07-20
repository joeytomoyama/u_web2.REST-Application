import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../features/authSlice"
import { CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

interface EditCourseModalProps {
  showEdit: boolean
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
  clickedCourse: CourseType | undefined
}

const editUniversityName = "EditCourseComponentEditUniversityName"
const editUniversityShortName = "EditCourseComponentEditUniversityShortName"
const editDepartmentName = "EditCourseComponentEditDepartmentName"
const editName = "EditCourseComponentEditName"
const editShortName = "EditCourseComponentEditShortName"

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
    const universityName =
      (document.getElementById(editUniversityName) as HTMLInputElement)
        ?.value ?? ""
    const universityShortName =
      (document.getElementById(editUniversityShortName) as HTMLInputElement)
        ?.value ?? ""
    const departmentName =
      (document.getElementById(editDepartmentName) as HTMLInputElement)
        ?.value ?? ""
    const name =
      (document.getElementById(editName) as HTMLInputElement)?.value ?? ""
    const shortName =
      (document.getElementById(editShortName) as HTMLInputElement)?.value ?? ""

    const editedCourse: CourseType | Record<any, any> = {}
    if (universityName) editedCourse.universityName = universityName
    if (universityShortName)
      editedCourse.universityShortName = universityShortName
    if (departmentName) editedCourse.departmentName = departmentName
    if (name) editedCourse.name = name
    if (shortName) editedCourse.shortName = shortName

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
    <Modal show={showEdit} id="CourseManagementPageEditComponent">
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
                id="EditCourseComponentEditId"
                type="text"
                placeholder={clickedCourse?.id}
                disabled={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityName:</Form.Label>
              <Form.Control
                id={editUniversityName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>universityShortName:</Form.Label>
              <Form.Control
                id={editUniversityShortName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>departmentName:</Form.Label>
              <Form.Control
                id={editDepartmentName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>name:</Form.Label>
              <Form.Control id={editName} type="text" placeholder="" />
            </Form.Group>
            <Form.Group>
              <Form.Label>shortName:</Form.Label>
              <Form.Control id={editShortName} type="text" placeholder="" />
            </Form.Group>
            <Button
              id="EditCourseComponentSaveCourseButton"
              variant="primary"
              onClick={handleCourseEdit}
            >
              Edit Course
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="OpenCourseManagementPageListComponentButton"
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
