import { Button, Card } from "react-bootstrap"
import { CourseType } from "../../types"
import * as IDS from "../../ids"

interface CourseProps {
  course: CourseType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setShowApply: React.Dispatch<React.SetStateAction<boolean>>
  setClickedCourse: React.Dispatch<React.SetStateAction<CourseType | undefined>>
}

export default function Course({
  course,
  setShowEdit,
  setShowDelete,
  setShowApply,
  setClickedCourse,
}: CourseProps) {
  return (
    <Card
      id={IDS.DegreeCourseItem + course.id}
      style={{
        width: "27rem",
        border: "0",
        margin: "10px",
      }}
    >
      <Card.Body>
        <Card.Title>{`${course.name}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{course.id}</Card.Subtitle>
        <Card.Text id={IDS.Name}>Name: {course.name}</Card.Text>
        <Card.Text>Short Name: {course.shortName}</Card.Text>
        <Card.Text id={IDS.DepartmentName}>
          Department Name: {course.departmentName}
        </Card.Text>
        <Card.Text>
          Department Short Name: {course.departmentShortName}
        </Card.Text>
        <Card.Text id={IDS.UniversityName}>
          University Name: {course.universityName}
        </Card.Text>
        <Card.Text id={IDS.UniversityShortName}>
          University Short Name: {course.universityShortName}
        </Card.Text>
        <Button
          id={IDS.DegreeCourseItemEditButton + course.id}
          onClick={() => {
            setClickedCourse(course)
            setShowEdit(true)
          }}
        >
          Edit Course
        </Button>
        <Button
          id={IDS.DegreeCourseItemDeleteButton + course.id}
          onClick={() => {
            setClickedCourse(course)
            setShowDelete(true)
          }}
        >
          Delete Course
        </Button>
        <Button
          id={IDS.CreateDegreeCourseApplicationForDegreeCourse + course.id}
          onClick={() => {
            setClickedCourse(course)
            setShowApply(true)
          }}
        >
          Apply
        </Button>
      </Card.Body>
    </Card>
  )
}
