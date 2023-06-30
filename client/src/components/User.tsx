import { Button } from "react-bootstrap"

interface UserProps {
  id: string
  user: UserType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setUserToEdit: React.Dispatch<React.SetStateAction<string>>
}

export interface UserType {
  userID?: string
  firstName?: string
  lastName?: string
  password?: string
  isAdministrator?: boolean
}

const editButtonText = "UserItemEditButton"
const deleteButtonText = "UserItemDeleteButton"

export default function User({
  id,
  user,
  setShowEdit,
  setUserToEdit,
}: UserProps) {
  return (
    <div
      id={id}
      style={{
        borderRadius: "5px",
        backgroundColor: "grey",
        margin: "10px",
        padding: "10px",
      }}
    >
      <p>{user.userID}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <Button
        id={editButtonText + user.userID}
        onClick={() => {
          setUserToEdit(user.userID as string)
          setShowEdit(true)
        }}
      >
        Edit User
      </Button>
      <Button id={deleteButtonText + user.userID}>Delete User</Button>
    </div>
  )
}
