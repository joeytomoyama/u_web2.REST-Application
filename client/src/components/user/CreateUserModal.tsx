import { Modal, Form, Button } from "react-bootstrap"
import { selectAuth } from "../../features/authSlice"
import { UserType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

interface CreateUserModalProps {
  showCreate: boolean
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}

const editUserID = "CreateUserComponentEditUserID"
const editFirstName = "CreateUserComponentEditUniversityShortName"
const editLastName = "CreateUserComponentEditLastName"
const editPassword = "CreateUserComponentEditPassword"
const editIsAdministrator = "CreateUserComponentEditShortName"

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
    const userId =
      (document.getElementById(editUserID) as HTMLInputElement)?.value ?? ""
    const firstName =
      (document.getElementById(editFirstName) as HTMLInputElement)?.value ?? ""
    const lastName =
      (document.getElementById(editLastName) as HTMLInputElement)?.value ?? ""
    const password =
      (document.getElementById(editPassword) as HTMLInputElement)?.value ?? ""
    const isAdministrator =
      (document.getElementById(editIsAdministrator) as HTMLInputElement)
        ?.checked ?? false

    //auslagern UserService
    const createdUser: UserType = {
      userID: userId,
      firstName: firstName,
      lastName: lastName,
      password: password,
      isAdministrator: isAdministrator,
    }

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
    <Modal show={showCreate} id="UserManagementPageCreateComponent">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>userId:</Form.Label>
              <Form.Control id={editUserID} type="text" placeholder="" />
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
              id="CreateUserComponentCreateUserButton"
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
