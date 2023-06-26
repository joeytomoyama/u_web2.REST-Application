import { Button } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import { useEffect, useState } from "react"
import { readFromStream } from "../utils"

export default function UserManagementPage() {
  const authSlice = useAppSelector(selectAuth)
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(authSlice.token)
    fetch("https://localhost/api/users", {
      method: "GET",
      headers: {
        Authorization: "Basic " + authSlice.token,
      } as HeadersInit,
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setUsers(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="App">
      <p>User-List</p>
      <Button id="UserManagementPageCreateUserButton">Add User</Button>
      <ul>{users.map((user) => `<li>${user}</li>`)}</ul>
    </div>
  )
}
