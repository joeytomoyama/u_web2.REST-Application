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

export default function Footer() {
  const authSlice = useAppSelector(selectAuth)
  const user = authSlice.body?.userID
  const isAdmin = authSlice.body?.isAdministrator

  return (
    <footer>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        id="footer"
        data-bs-theme="dark"
        style={{
          bottom: "0",
          marginTop: "1rem",
        }}
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
              <Navbar.Text>© 2023 Berliner Hochschule für Technik</Navbar.Text>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <a
                href="https://www.bht-berlin.de/impressum"
                target="_blank"
                className="nav-link"
              >
                Impressum
              </a>
              <a
                href="https://www.bht-berlin.de/datenschutz"
                target="_blank"
                className="nav-link"
              >
                Datenschutz
              </a>
              <a
                href="https://www.bht-berlin.de/barrierefreiheit"
                target="_blank"
                className="nav-link"
              >
                Barrierefreiheit
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </footer>
  )
}
