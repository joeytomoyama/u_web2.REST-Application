import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { UserType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import * as IDS from "../../ids"
import { editUser } from "../UserService"

interface EditUserModalProps {
  showEdit: boolean
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  clickedUser: UserType | undefined
}

export default function EditUserModal({
  showEdit,
  setShowEdit,
  users,
  setUsers,
  clickedUser,
}: EditUserModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const navigate = useNavigate()

  const handleUserEdit = (e: any) => {
    e.preventDefault()

    const editedUser = editUser()

    const editedUserString = JSON.stringify(editedUser)

    fetch(import.meta.env.VITE_SERVER_URL + "users/" + clickedUser?.userID, {
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
          if (user.userID === clickedUser?.userID) {
            return { ...user, ...editedUser }
          } else {
            return user
          }
        }) as UserType[]
        setUsers(newUsers)
        setShowEdit(false)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        navigate("/")
      })
  }
  return (
    <Modal show={showEdit} id={IDS.UserManagementPageEditComponent}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Edit User: ${clickedUser?.firstName} ${clickedUser?.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>userID:</Form.Label>
              <Form.Control
                id={IDS.EditUserComponentEditUserID}
                type="text"
                placeholder={clickedUser?.userID}
                disabled={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>firstName:</Form.Label>
              <Form.Control
                id={IDS.EditUserComponentEditFirstName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>lastName:</Form.Label>
              <Form.Control
                id={IDS.EditUserComponentEditLastName}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>password:</Form.Label>
              <Form.Control
                id={IDS.EditUserComponentEditPassword}
                type="password"
                placeholder=""
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>is Administrator:</Form.Label>
              <Form.Switch
                id={IDS.EditUserComponentEditIsAdministrator}
                type="checkbox"
                placeholder=""
              />
            </Form.Group>
            <Button
              id={IDS.EditUserComponentSaveUserButton}
              variant="primary"
              onClick={handleUserEdit}
            >
              Edit User
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.OpenUserManagementPageListComponentButton}
            onClick={() => setShowEdit(false)}
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
