import { Modal, Form, Button } from "react-bootstrap"
import {
  authenticateAsync,
  hideAuthModal,
  selectAuth,
  showAuthModal,
} from "../features/authSlice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"

// interface LoginModalProps {
//   showLogin: boolean
//   setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
// }

export default function LoginModal() {
  const dispatch = useDispatch()
  const authSlice = useAppSelector(selectAuth)
  // const showModal = authSlice.showAuthModal

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    // const username = (
    //   document.getElementById("LoginDialogUserIDText") as HTMLInputElement
    // ).value
    // const password = (
    //   document.getElementById("LoginDialogPasswordText") as HTMLInputElement
    // ).value
    const username = e.target.elements[0].value
    const password = e.target.elements[1].value
    const credentials = {
      username: username,
      password: password,
    }
    dispatch(authenticateAsync(credentials) as any)
  }

  return (
    <div>
      <Modal id="LoginDialog" show={authSlice.showAuthModal}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login Dialogue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
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
            <Button
              onClick={() => dispatch(hideAuthModal())}
              variant="secondary"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}
