import { Button } from "react-bootstrap"
import { useAppSelector } from "../../../app/hooks"
import { selectAuth } from "../../authentication/features/authSlice"
import { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { CourseType } from "../../../types"
import Course from "./Course"
import { useNavigate } from "react-router-dom"
import CreateCourseModal from "./CreateCourseModal"
import EditCourseModal from "./EditCourseModal"
import DeleteCourseModal from "./DeleteCourseModal"
import * as IDS from "../../../ids"

export default function CourseManagementPage() {
  const authSlice: any = useAppSelector(selectAuth)

  const [courses, setCourses] = useState<CourseType[]>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [clickedCourse, setClickedCourse] = useState<CourseType | undefined>(
    undefined,
  )

  const navigate = useNavigate()

  //   const [userFetchError, setUserFetchError] = useState<boolean>(false)

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "degreeCourses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authSlice.token}`,
      } as HeadersInit,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
        // setUserFetchError(true)
        navigate("/")
      })
      .then((data) => {
        console.log(data)
        setCourses(data)
        // setUserFetchError(false)
      })
      .catch((error) => {
        console.error(error)
        // setUserFetchError(true)
        navigate("/")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={IDS.DegreeCourseManagementPage}>
      <h2>Course-List</h2>
      <Button
        id={IDS.UserManagementPageCreateUserButton}
        onClick={() => {
          setShowCreate(true)
        }}
      >
        Add Course
      </Button>
      <CreateCourseModal
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        courses={courses}
        setCourses={setCourses}
      />
      <EditCourseModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        courses={courses}
        setCourses={setCourses}
        clickedCourse={clickedCourse}
      />
      <DeleteCourseModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        courses={courses}
        setCourses={setCourses}
        clickedCourse={clickedCourse}
      />

      <ul
        id={IDS.DegreeCourseManagementPageListComponent}
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {courses.map((course: CourseType) => (
          <li key={course.id}>
            {
              <Course
                course={course}
                setShowEdit={setShowEdit}
                setShowDelete={setShowDelete}
                setClickedCourse={setClickedCourse}
              />
            }
          </li>
        ))}
      </ul>
      <LinkContainer to="/">
        <Button id={IDS.OpenStartPageButton}>Start Page</Button>
      </LinkContainer>
    </div>
  )
}
