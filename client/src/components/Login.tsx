import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
// import { clearToken, selectAuth, setToken } from "../features/authSlice.old"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import {
  selectAuth,
  clearToken,
  authenticateAsync,
} from "../features/authSlice"
import { LinkContainer } from "react-router-bootstrap"

export default function Login() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  const dispatch = useDispatch()

  const [showLogin, setShowLogin] = React.useState(false)
  return (
    <div>
      {!isAuth && (
        <>
          {!showLogin && (
            <Button
              id="OpenLoginDialogButton"
              onClick={() => setShowLogin(true)}
            >
              Log in
            </Button>
          )}
          <Modal id="LoginDialog" show={showLogin}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Login Dialogue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const username = (
                      document.getElementById(
                        "LoginDialogUserIDText",
                      ) as HTMLInputElement
                    ).value
                    const password = (
                      document.getElementById(
                        "LoginDialogPasswordText",
                      ) as HTMLInputElement
                    ).value
                    const credentials = {
                      username: username,
                      password: password,
                    }
                    dispatch(authenticateAsync(credentials) as any)
                  }}
                >
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      id="LoginDialogUserIDText"
                      type="text"
                      placeholder="Your username"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      id="LoginDialogPasswordText"
                      type="password"
                      placeholder=""
                    />
                  </Form.Group>
                  <Button
                    id="PerformLoginButton"
                    variant="primary"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="primary">Save changes</Button> */}
                <Button onClick={() => setShowLogin(false)} variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </>
      )}
      {isAuth && (
        <LinkContainer to="/">
          <Button
            id="LogoutButton"
            style={{
              right: "0",
              position: "absolute",
            }}
            onClick={() => {
              setShowLogin(false)
              dispatch(clearToken())
            }}
          >
            Logout
          </Button>
        </LinkContainer>
      )}
    </div>
  )
}
