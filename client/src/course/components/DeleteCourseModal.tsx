import { Modal, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { CourseType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import * as IDS from "../../ids"

interface DeleteCourseModalProps {
  showDelete: boolean
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>
  clickedCourse: CourseType | undefined
}

export default function DeleteCourseModal({
  showDelete,
  setShowDelete,
  courses,
  setCourses,
  clickedCourse,
}: DeleteCourseModalProps) {
  const authSlice: any = useAppSelector(selectAuth)

  const handleCourseDelete = (e: any) => {
    e.preventDefault()
    fetch(
      import.meta.env.VITE_SERVER_URL + "degreeCourses/" + clickedCourse?.id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + authSlice.token,
        },
      },
    ).then((response) => {
      if (response.status !== 204) return
      const newCourses = courses.filter(
        (u: CourseType) => u.id !== clickedCourse?.id,
      ) as CourseType[]
      setCourses(newCourses)
      setShowDelete(false)
    })
  }
  return (
    <Modal
      show={showDelete}
      id={IDS.DeleteDialogDegreeCourse + clickedCourse?.id}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Delete Course ${clickedCourse?.shortName}: ${clickedCourse?.name}?`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Should the Course ${clickedCourse?.shortName}: ${clickedCourse?.name} be deleted?`}</Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.DeleteDialogCancelButton}
            onClick={() => setShowDelete(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            id={IDS.DeleteDialogConfirmButton}
            onClick={handleCourseDelete}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
