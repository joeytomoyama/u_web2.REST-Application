import { Button, Card, ListGroup } from "react-bootstrap"
import { UserType } from "../../types"
import * as IDS from "../../ids"

interface UserProps {
  user: UserType
  setShowEdit?: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete?: React.Dispatch<React.SetStateAction<boolean>>
  setClickedUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>
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
        <ListGroup variant="flush">
          <ListGroup.Item style={{ backgroundColor: "inherit" }}>
            First Name: {user.firstName}
          </ListGroup.Item>
          <ListGroup.Item style={{ backgroundColor: "inherit" }}>
            Last Name: {user.lastName}
          </ListGroup.Item>
          <ListGroup.Item style={{ backgroundColor: "inherit" }}>
            Is Admin: {user.isAdministrator ? "✅" : "❌"}
          </ListGroup.Item>
        </ListGroup>
        {setShowEdit && setClickedUser && (
          <Button
            id={IDS.UserItemEditButton + user.userID}
            onClick={() => {
              setClickedUser(user)
              setShowEdit(true)
            }}
          >
            Edit User
          </Button>
        )}
        {setShowDelete && setClickedUser && (
          <Button
            id={IDS.UserItemDeleteButton + user.userID}
            onClick={() => {
              setClickedUser(user)
              setShowDelete(true)
            }}
          >
            Delete User
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
