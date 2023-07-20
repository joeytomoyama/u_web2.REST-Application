import { Button, Modal, Form } from "react-bootstrap"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/authSlice"
import { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { CourseType } from "../../types"
import Course from "./Course"
import { useNavigate } from "react-router-dom"
import CreateCourseModal from "./CreatCourseModal"
import EditCourseModal from "./EditCourseModal"
import DeleteCourseModal from "./DeleteCourseModal"

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
  }, [])

  return (
    <div className="CourseManagementPage">
      <h2>Course-List</h2>
      <Button
        id="UserManagementPageCreateUserButton"
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
      {/* <DeleteCourseModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        courses={courses}
        setCourses={setCourses}
        clickedCourse={clickedCourse}
      /> */}

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {courses.map((course: CourseType) => (
          <Course
            id={"UserItem" + course.id}
            course={course}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
            setClickedCourse={setClickedCourse}
          />
        ))}
      </ul>
      <LinkContainer to="/">
        <Button id="OpenStartPageButton">Start Page</Button>
      </LinkContainer>
    </div>
  )
}
