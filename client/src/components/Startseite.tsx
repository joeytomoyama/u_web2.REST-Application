import { Link } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import Login from "./Login"
import Button from "react-bootstrap/Button"

export default function Startseite() {
  const authSlice = useAppSelector(selectAuth)
  const token = authSlice.token
  const isAdmin = authSlice.isAdministrator
  return (
    <div id="StartPage">
      <header
        style={{ position: "absolute", top: "0", right: "0", margin: "10px" }}
      >
        <Login />
      </header>
      <h1>Successfully logged in!</h1>
      {isAdmin && (
        // <Button id="OpenUserManagementPageButton">User-Management</Button>
        <Link to={"/usermanagement"}>User Management</Link>
      )}
    </div>
  )
}
