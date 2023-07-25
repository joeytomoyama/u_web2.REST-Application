import { useState, useEffect } from "react"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../authentication/features/authSlice"
import { ApplicationType, UserType } from "../types"
import { useNavigate } from "react-router-dom"
import User from "../user/components/User"
import Application from "../application/components/Application"
import * as IDS from "../ids"

export default function Profile() {
  const authSlice: any = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const [user, setUser] = useState<UserType>(authSlice.body)
  const [applications, setApplications] = useState<ApplicationType[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "users/" + authSlice.body?.userID, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authSlice.token}`,
      } as HeadersInit,
    })
      .then((response) => response.json())
      .catch((error) => navigate("/"))
      .then((data) => {
        console.log(data)
        setUser(data)
        // setUserFetchError(false)
      })
      .catch((error) => {
        console.error(error)
        // setUserFetchError(true)
        navigate("/")
      })

    fetch(
      import.meta.env.VITE_SERVER_URL +
        "degreeCourseApplications/myApplications/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authSlice.token}`,
        } as HeadersInit,
      },
    )
      .then((response) => response.json())
      .catch((error) => navigate("/"))
      .then((data) => {
        console.log(data)
        setApplications(data)
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
    <div>
      <h1>Profile</h1>
      <User user={user} />
      <h2>My Applications</h2>
      <ul
        id={IDS.DegreeCourseApplicationManagementPageListComponent}
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {applications.map((application: ApplicationType) => (
          <li key={application.id}>
            {
              <Application
                application={application}
                // setShowEdit={setShowEdit}
                // setShowDelete={setShowDelete}
                // setClickedApplication={setClickedApplication}
              />
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
