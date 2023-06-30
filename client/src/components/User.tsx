import { Button } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"

interface UserProps {
  id: string
  user: UserType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setUserToEdit: React.Dispatch<React.SetStateAction<string>>
  users: any
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
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
  users,
  setUsers,
}: UserProps) {
  const authSlice = useAppSelector(selectAuth)
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
      <Button
        id={deleteButtonText + user.userID}
        onClick={() => {
          fetch("https://localhost/api/users/" + user.userID, {
            method: "DELETE",
            headers: {
              Authorization: "Basic " + authSlice.token,
            },
            // body: deletedUserString,
          }).then((response) => {
            const newUsers = users.map((userr: UserType) => {
              if (userr !== user.userID) {
                return userr
              } else {
                return null
              }
            }) as UserType[]
            setUsers(newUsers)
            // setShowDelete(false)
            // console.log(data)
          })
          // .then((data) => {
          //   const newUsers = users.map((user: UserType) => {
          //     if (user !== user.userID) {
          //       return user
          //     } else {
          //       return null
          //     }
          //   }) as UserType[]
          //   setUsers(newUsers)
          //   // setShowDelete(false)
          //   console.log(data)
          // })
        }}
      >
        Delete User
      </Button>
    </div>
  )
}
