import { NavItem } from "react-bootstrap"
import Login from "../authentication/components/Login"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../authentication/features/authSlice"
import { LinkContainer } from "react-router-bootstrap"
import * as IDS from "../ids"

export default function Header() {
  const authSlice = useAppSelector(selectAuth)
  const user = authSlice.body?.userID
  const isAdmin = authSlice.body?.isAdministrator

  return (
    <header>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        id="header"
        data-bs-theme="dark"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              {import.meta.env.VITE_UNI_NAME}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAdmin && (
                <Link
                  id={IDS.OpenUserManagementPageButton}
                  to="/usermanagement"
                  className="nav-link"
                >
                  Users
                </Link>
              )}
              {user && (
                <Link
                  id={IDS.OpenDegreeCourseManagementPageButton}
                  to="/coursemanagement"
                  className="nav-link"
                >
                  Courses
                </Link>
              )}
              {isAdmin && (
                <Link
                  id={IDS.OpenDegreeCourseApplicationManagementPageButton}
                  to="/applicationmanagement"
                  className="nav-link"
                >
                  Applications
                </Link>
              )}
              {user && (
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              )}
              <a
                href="https://www.bht-berlin.de/"
                target="_blank"
                className="nav-link"
              >
                Old Homepage
              </a>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {authSlice.isAuthenticated && (
              <Navbar.Text>Signed in as: {user}</Navbar.Text>
            )}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Login />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
