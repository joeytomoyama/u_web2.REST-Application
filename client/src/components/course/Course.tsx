import { Button } from "react-bootstrap"
import { CourseType } from "../../types"

interface CourseProps {
  id: string
  course: CourseType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedCourse: React.Dispatch<React.SetStateAction<CourseType | undefined>>
}

const editButtonText = "UserItemEditButton"
const deleteButtonText = "UserItemDeleteButton"

export default function Course({
  id,
  course,
  setShowEdit,
  setShowDelete,
  setClickedCourse,
}: CourseProps) {
  return (
    <div
      id={id}
      style={{
        width: "fit-content",
        borderRadius: "5px",
        backgroundColor: "grey",
        margin: "10px",
        padding: "10px",
      }}
    >
      <p>{course.departmentName}</p>
      <p>{course.name}</p>
      <p>{course.shortName}</p>
      <Button
        id={editButtonText + course.id}
        onClick={() => {
          setClickedCourse(course)
          setShowEdit(true)
        }}
      >
        Edit Course
      </Button>
      <Button
        id={deleteButtonText + course.id}
        onClick={() => {
          setClickedCourse(course)
          setShowDelete(true)
        }}
      >
        Delete Course
      </Button>
    </div>
  )
}
