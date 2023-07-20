import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../features/authSlice"
import { UserType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

interface EditUserModalProps {
  showEdit: boolean
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  clickedUser: UserType | undefined
}

const editFirstName = "EditUserComponentEditFirstName"
const editLastName = "EditUserComponentEditLastName"
const editPassword = "EditUserComponentEditPassword"
const editIsAdministrator = "EditUserComponentEditIsAdministrator"

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
    const firstName =
      (document.getElementById(editFirstName) as HTMLInputElement)?.value ?? ""
    const lastName =
      (document.getElementById(editLastName) as HTMLInputElement)?.value ?? ""
    const password =
      (document.getElementById(editPassword) as HTMLInputElement)?.value ?? ""
    const isAdministrator =
      (document.getElementById(editIsAdministrator) as HTMLInputElement)
        ?.checked ?? false

    const editedUser: UserType = {}
    if (firstName) editedUser.firstName = firstName
    if (lastName) editedUser.lastName = lastName
    if (password) editedUser.password = password
    if (isAdministrator) editedUser.isAdministrator = isAdministrator

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
    <Modal show={showEdit} id="UserManagementPageEditComponent">
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
                id="EditUserComponentEditUserID"
                type="text"
                placeholder={clickedUser?.userID}
                disabled={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>firstName:</Form.Label>
              <Form.Control id={editFirstName} type="text" placeholder="" />
            </Form.Group>
            <Form.Group>
              <Form.Label>lastName:</Form.Label>
              <Form.Control id={editLastName} type="text" placeholder="" />
            </Form.Group>
            <Form.Group>
              <Form.Label>password:</Form.Label>
              <Form.Control id={editPassword} type="password" placeholder="" />
            </Form.Group>
            <Form.Group>
              <Form.Label>is Administrator:</Form.Label>
              <Form.Switch
                id={editIsAdministrator}
                type="checkbox"
                placeholder=""
              />
            </Form.Group>
            <Button
              id="EditUserComponentSaveUserButton"
              variant="primary"
              onClick={handleUserEdit}
            >
              Edit User
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="OpenUserManagementPageListComponentButton"
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
