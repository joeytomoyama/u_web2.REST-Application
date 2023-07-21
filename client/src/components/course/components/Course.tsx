import { Button, Card } from "react-bootstrap"
import { CourseType } from "../../../types"
import * as IDS from "../../../ids"
import { useAppSelector } from "../../../app/hooks"
import { selectAuth } from "../../authentication/features/authSlice"

interface CourseProps {
  course: CourseType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedCourse: React.Dispatch<React.SetStateAction<CourseType | undefined>>
}

export default function Course({
  course,
  setShowEdit,
  setShowDelete,
  setClickedCourse,
}: CourseProps) {
  const authSlice = useAppSelector(selectAuth)
  const handleApplication = (e: any) => {
    e.preventDefault()

    const application = {
      applicantUserID: authSlice.body?.userID,
      degreeCourseID: course.id,
      targetPeriodYear: "2023",
      targetPeriodShortName: "WS",
    }

    fetch(import.meta.env.VITE_SERVER_URL + "degreeCourseApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + authSlice.token,
      },
      body: JSON.stringify(application),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        // navigate("/")
      })
      .then((data) => {
        console.log(data)
      })
  }
  return (
    <Card
      id={IDS.DegreeCourseItem + course.id}
      style={{
        width: "27rem",
        border: "0",
        // backgroundColor: course.isAdministrator ? "yellow" : "",
        margin: "10px",
      }}
    >
      <Card.Body>
        <Card.Title>{`${course.name}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{course.id}</Card.Subtitle>
        <Card.Text>Name: {course.name}</Card.Text>
        <Card.Text>Short Name: {course.shortName}</Card.Text>
        <Card.Text>Department Name: {course.departmentName}</Card.Text>
        <Card.Text>
          Department Short Name: {course.departmentShortName}
        </Card.Text>
        <Card.Text>University Name: {course.universityName}</Card.Text>
        <Card.Text>
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
          onClick={handleApplication}
        >
          Apply
        </Button>
      </Card.Body>
    </Card>
  )
}
