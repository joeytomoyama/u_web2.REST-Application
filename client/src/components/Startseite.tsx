import { LinkContainer } from "react-router-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import Login from "./Login"
import Button from "react-bootstrap/Button"
import Header from "./Header"

export default function Startseite() {
  const authSlice = useAppSelector(selectAuth)
  const isAdmin = authSlice.isAdministrator
  return (
    <div id="StartPage" className="centered">
      {/* <header
        style={{ position: "absolute", top: "0", right: "0", margin: "10px" }}
      >
        <Login />
      </header> */}
      {/* <Header /> */}
      <h1>Successfully logged in!</h1>
      {isAdmin && (
        <LinkContainer to="/usermanagement">
          <Button id="OpenUserManagementPageButton">User Management</Button>
        </LinkContainer>
      )}
    </div>
  )
}
