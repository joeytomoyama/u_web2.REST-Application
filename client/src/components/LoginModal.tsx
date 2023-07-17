import { Modal, Form, Button } from "react-bootstrap"
import { authenticateAsync } from "../features/authSlice"
import { useDispatch } from "react-redux"

interface LoginModalProps {
  showLogin: boolean
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginModal({
  showLogin,
  setShowLogin,
}: LoginModalProps) {
  const dispatch = useDispatch()

  return (
    <div>
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
                  placeholder=""
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
              <Button id="PerformLoginButton" variant="primary" type="submit">
                Log in
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowLogin(false)} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}
