import { NavItem } from "react-bootstrap"
import Login from "./Login"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/authSlice"
import { LinkContainer } from "react-router-bootstrap"

// export default function Header() {
//   return (
//     <div
//       id="Header"
//       style={{
//         backgroundColor: "black",
//         color: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignContent: "center",
//         flexDirection: "row",
//         top: "0",
//         width: "100%",
//         padding: "10px",
//       }}
//     >
//       <h1>{import.meta.env.VITE_UNI_NAME}</h1>
//       <Login />
//     </div>
//   )
// }

// {authSlice.isAuthenticated && (
//   <Navbar.Collapse className="justify-content-end">
//     <Navbar.Text>
//       {/* Signed in as: <a href="#login">{user}</a> */}
//       Signed in as: {user}
//     </Navbar.Text>
//     <Login />
//   </Navbar.Collapse>
// )}
// {!authSlice.isAuthenticated && (
//   <Navbar.Collapse className="justify-content-end">
//     <Login />
//   </Navbar.Collapse>
// )}

export default function Header() {
  const authSlice = useAppSelector(selectAuth)
  const user = authSlice.body?.userID
  const isAdmin = authSlice.body?.isAdministrator
  console.log("user", user)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">{import.meta.env.VITE_UNI_NAME}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/usermanagement">Users</Nav.Link>
            <Nav.Link href="/coursemanagement">Courses</Nav.Link> */}
            {isAdmin && (
              <Link to="/usermanagement" className="nav-link">
                Users
              </Link>
            )}
            {isAdmin && (
              <Link to="/coursemanagement" className="nav-link">
                Courses
              </Link>
            )}
            {isAdmin && (
              <Link to="/applicationmanagement" className="nav-link">
                Applications
              </Link>
            )}
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/oldpage" className="nav-link">
              Old Homepage
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {authSlice.isAuthenticated && (
            <Navbar.Text>Signed in as: {user}</Navbar.Text>
          )}
          {/* <Login /> */}
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Login />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
