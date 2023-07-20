import { Modal, Form, Button } from "react-bootstrap"
import authSlice, { selectAuth } from "../../features/authSlice"
import { UserType } from "../../types"
import { useAppSelector } from "../../app/hooks"

interface DeleteCourseModalProps {
  showDelete: boolean
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  clickedUser: UserType | undefined
}

export default function DeleteCourseModal({
  showDelete,
  setShowDelete,
  users,
  setUsers,
  clickedUser,
}: DeleteCourseModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const handleUserDelete = (e: any) => {
    e.preventDefault()
    fetch(import.meta.env.VITE_SERVER_URL + "users/" + clickedUser?.userID, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + authSlice.token,
      },
    }).then((response) => {
      const newUsers = users.filter(
        (u: UserType) => u.userID !== clickedUser?.userID,
      ) as UserType[]
      setUsers(newUsers)
      setShowDelete(false)
    })
  }
  return (
    <Modal show={showDelete} id={`DeleteDialogUser${clickedUser?.userID}`}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Delete User ${clickedUser?.firstName} ${clickedUser?.lastName}?`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Soll User ${clickedUser?.firstName} ${clickedUser?.lastName} gelöscht werden?`}</Modal.Body>
        <Modal.Footer>
          <Button
            id="DeleteDialogCancelButton"
            onClick={() => setShowDelete(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            id="DeleteDialogConfirmButton"
            onClick={handleUserDelete}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
