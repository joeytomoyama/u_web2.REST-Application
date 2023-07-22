import { Button } from "react-bootstrap"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../authentication/features/authSlice"
import { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { ApplicationType } from "../../types"
import Application from "./Application"
import { useNavigate } from "react-router-dom"
import DeleteApplicationModal from "./DeleteApplicationModal"
import * as IDS from "../../ids"

export default function ApplicationManagementPage() {
  const authSlice: any = useAppSelector(selectAuth)

  const [applications, setApplications] = useState<ApplicationType[]>([])
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [clickedApplication, setClickedApplication] = useState<
    ApplicationType | undefined
  >(undefined)

  const navigate = useNavigate()

  //   const [userFetchError, setUserFetchError] = useState<boolean>(false)

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "degreeCourseApplications", {
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
    <div className={IDS.DegreeCourseApplicationManagementPage}>
      <h2>Application-List</h2>
      {/* <Button
        id={IDS.UserManagementPageCreateUserButton}
        onClick={() => {
          setShowCreate(true)
        }}
      >
        Add Application
      </Button> */}
      <DeleteApplicationModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        applications={applications}
        setApplications={setApplications}
        clickedApplication={clickedApplication}
      />

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
                setShowDelete={setShowDelete}
                setClickedApplication={setClickedApplication}
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
