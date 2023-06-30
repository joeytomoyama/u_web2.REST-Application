import { Button, Modal, Form } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import { useEffect, useState } from "react"
import User, { UserType } from "./User"
import { Link, json } from "react-router-dom"

export default function UserManagementPage() {
  const authSlice = useAppSelector(selectAuth)
  const [users, setUsers] = useState<UserType[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [userToEdit, setUserToEdit] = useState("")
  // const [userToEdit, setUserToEdit] = useState("")

  useEffect(() => {
    console.log(authSlice.token)
    fetch("https://localhost/api/users", {
      method: "GET",
      headers: {
        Authorization: "Basic " + authSlice.token,
      } as HeadersInit,
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="UserManagementPage">
      <p>User-List</p>
      <Button
        id="UserManagementPageCreateUserButton"
        onClick={() => {
          setShowCreate(true)
        }}
      >
        Add User
      </Button>
      <Modal show={showCreate} id="UserManagementPageCreateComponent">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>userId:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditUserID"
                  type="text"
                  placeholder="Your username"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>firstName:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditFirstName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>lastName:</Form.Label>
                <Form.Control
                  id="„CreateUserComponentEditLastName“"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditPassword"
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>is Administrator:</Form.Label>
                <Form.Switch
                  id="CreateUserComponentEditIsAdministrator"
                  type="checkbox"
                  placeholder=""
                />
              </Form.Group>
              <Button
                id="createUserButton"
                variant="primary"
                onClick={() => {
                  const userId = (
                    document.getElementById(
                      "CreateUserComponentEditUserID",
                    ) as HTMLInputElement
                  ).value
                  const firstName = (
                    document.getElementById(
                      "CreateUserComponentEditFirstName",
                    ) as HTMLInputElement
                  ).value
                  const lastName = (
                    document.getElementById(
                      "„CreateUserComponentEditLastName“",
                    ) as HTMLInputElement
                  ).value
                  const password = (
                    document.getElementById(
                      "CreateUserComponentEditPassword",
                    ) as HTMLInputElement
                  ).value
                  const isAdministrator = (
                    document.getElementById(
                      "CreateUserComponentEditIsAdministrator",
                    ) as HTMLInputElement
                  ).checked

                  const createdUser: UserType = {
                    userID: userId,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    isAdministrator: isAdministrator,
                  }

                  fetch("https://localhost/api/users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + authSlice.token,
                    },
                    body: JSON.stringify(createdUser),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("data:", data)
                      if (data) setUsers([...users, data])
                      setShowCreate(false)
                    })
                }}
              >
                Create User
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowCreate(false)} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <Modal show={showEdit} id="UserManagementPageEditComponent">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{"Edit User: " + userToEdit}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>firstName:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditFirstName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>lastName:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditLastName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditPassword"
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>is Administrator:</Form.Label>
                <Form.Switch
                  id="EditUserComponentEditIsAdministrator"
                  type="checkbox"
                  placeholder=""
                />
              </Form.Group>
              <Button
                id="editUserButton"
                variant="primary"
                onClick={() => {
                  const firstName =
                    (
                      document.getElementById(
                        "EditUserComponentEditFirstName",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const lastName =
                    (
                      document.getElementById(
                        "EditUserComponentEditLastName",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const password =
                    (
                      document.getElementById(
                        "EditUserComponentEditPassword",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const isAdministrator =
                    (
                      document.getElementById(
                        "EditUserComponentEditIsAdministrator",
                      ) as HTMLInputElement
                    )?.checked ?? false

                  const editedUser: UserType = {}
                  if (firstName) editedUser.firstName = firstName
                  if (lastName) editedUser.lastName = lastName
                  if (password) editedUser.password = password
                  if (isAdministrator)
                    editedUser.isAdministrator = isAdministrator

                  const editedUserString = JSON.stringify(editedUser)

                  fetch("https://localhost/api/users/" + userToEdit, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + authSlice.token,
                    },
                    body: editedUserString,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      const newUsers = users.map((user) => {
                        if (user.userID === userToEdit) {
                          return { ...user, ...editedUser }
                        } else {
                          return user
                        }
                      }) as UserType[]
                      setUsers(newUsers)
                      setShowEdit(false)
                      console.log(data)
                    })
                }}
              >
                Edit User
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowEdit(false)} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      <ul>
        {users.map((user: UserType) => (
          <li key={user.userID}>
            {
              <User
                id={"UserItem" + user.userID}
                user={user}
                setShowEdit={setShowEdit}
                setUserToEdit={setUserToEdit}
                users={users}
                setUsers={setUsers}
              />
            }
          </li>
        ))}
      </ul>
      <Link to={"/"}>Start Page</Link>
    </div>
  )
}
