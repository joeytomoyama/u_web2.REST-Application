import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { UserType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
import { createUser } from "../UserService"

interface CreateUserModalProps {
  showCreate: boolean
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}

export default function CreateUserModal({
  showCreate,
  setShowCreate,
  users,
  setUsers,
}: CreateUserModalProps) {
  const authSlice: any = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    const createdUser = createUser()

    fetch(import.meta.env.VITE_SERVER_URL + "users", {
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
        if ("userID" in data) setUsers([...users, data])
        setShowCreate(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        navigate("/")
      })
  }
  return (
    <Modal show={showCreate} id={IDS.UserManagementPageCreateComponent}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>userId:</Form.Label>
              <Form.Control
                id={IDS.CreateUserComponentEditUserID}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>firstName:</Form.Label>
              <Form.Control
                id={IDS.CreateUserComponentEditFirstName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>lastName:</Form.Label>
              <Form.Control
                id={IDS.CreateUserComponentEditLastName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>password:</Form.Label>
              <Form.Control
                id={IDS.CreateUserComponentEditPassword}
                type="password"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>is Administrator:</Form.Label>
              <Form.Switch
                id={IDS.CreateUserComponentEditIsAdministrator}
                type="checkbox"
                placeholder=""
              />
            </Form.Group>
            <Button
              id={IDS.CreateUserComponentCreateUserButton}
              variant="primary"
              onClick={handleFormSubmit}
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
  )
}
