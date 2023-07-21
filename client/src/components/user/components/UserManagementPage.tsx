import { Button } from "react-bootstrap"
import { useAppSelector } from "../../../app/hooks"
import { selectAuth } from "../../authentication/features/authSlice"
import { useEffect, useState } from "react"
import User from "./User"
import { LinkContainer } from "react-router-bootstrap"
import { UserType } from "../../../types"
import CreateModal from "./CreateUserModal"
import EditModal from "./EditUserModal"
import DeleteModal from "./DeleteUserModal"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../../ids"

export default function UserManagementPage() {
  const authSlice: any = useAppSelector(selectAuth)

  const [users, setUsers] = useState<UserType[]>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [clickedUser, setClickedUser] = useState<UserType | undefined>(
    undefined,
  )

  // const [userFetchError, setUserFetchError] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authSlice.token}`,
      } as HeadersInit,
    })
      .then((response) => response.json())
      .catch((error) => navigate("/"))
      .then((data) => {
        console.log(data)
        setUsers(data)
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
    <div className={IDS.UserManagementPage}>
      <h2>User-List</h2>
      <Button
        id={IDS.UserManagementPageCreateUserButton}
        onClick={() => {
          setShowCreate(true)
        }}
      >
        Add User
      </Button>
      <CreateModal
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        users={users}
        setUsers={setUsers}
      />
      <EditModal
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        users={users}
        setUsers={setUsers}
        clickedUser={clickedUser}
      />
      <DeleteModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        users={users}
        setUsers={setUsers}
        clickedUser={clickedUser}
      />
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {users.map((user: UserType) => (
          <li key={user.userID}>
            {
              <User
                user={user}
                setShowEdit={setShowEdit}
                setShowDelete={setShowDelete}
                setClickedUser={setClickedUser}
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
