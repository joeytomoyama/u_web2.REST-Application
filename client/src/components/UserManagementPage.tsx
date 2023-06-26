import { Button } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import { useEffect, useState } from "react"

export default function UserManagementPage() {
  const authSlice = useAppSelector(selectAuth)
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(authSlice.token)
    fetch("https://localhost/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authSlice.token,
      } as HeadersInit,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="App">
      <p>User-List</p>
      <Button id="UserManagementPageCreateUserButton">Add User</Button>
    </div>
  )
}
