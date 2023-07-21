import { Button, Card } from "react-bootstrap"
import { UserType } from "../../../types"
import * as IDS from "../../../ids"

interface UserProps {
  user: UserType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

export default function User({
  user,
  setShowEdit,
  setShowDelete,
  setClickedUser,
}: UserProps) {
  return (
    <Card
      id={IDS.UserItem + user.userID}
      style={{
        width: "18rem",
        border: "0",
        backgroundColor: user.isAdministrator ? "yellow" : "",
        margin: "10px",
      }}
    >
      <Card.Body>
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.userID}</Card.Subtitle>
        <Card.Text>First Name: {user.firstName}</Card.Text>
        <Card.Text>Last Name: {user.lastName}</Card.Text>
        <Card.Text>Is Admin: {user.isAdministrator ? "✅" : "❌"}</Card.Text>
        <Button
          id={IDS.UserItemEditButton + user.userID}
          onClick={() => {
            setClickedUser(user)
            setShowEdit(true)
          }}
        >
          Edit User
        </Button>
        <Button
          id={IDS.UserItemDeleteButton + user.userID}
          onClick={() => {
            setClickedUser(user)
            setShowDelete(true)
          }}
        >
          Delete User
        </Button>
      </Card.Body>
    </Card>
  )
}
