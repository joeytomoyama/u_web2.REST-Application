import { Button } from "react-bootstrap"

interface UserProps {
  id: string
  user: UserType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
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
  setShowDelete,
  setClickedUser,
}: UserProps) {
  return (
    <div
      id={id}
      style={{
        width: "fit-content",
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
          setClickedUser(user)
          setShowEdit(true)
        }}
      >
        Edit User
      </Button>
      <Button
        id={deleteButtonText + user.userID}
        onClick={() => {
          setClickedUser(user)
          setShowDelete(true)
        }}
      >
        Delete User
      </Button>
    </div>
  )
}
