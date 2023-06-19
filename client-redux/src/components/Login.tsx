import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
// import { clearToken, selectAuth, setToken } from "../features/authSlice.old"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { selectAuth, setToken, clearToken } from "../features/authSlice"

// interface LoginProps {
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
// }

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
              Show dialogue
            </Button>
          )}
          <Modal id="LoginDialog" show={showLogin}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Login Dialogue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <form
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
                    fetch("https://localhost/api/authenticate", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${btoa(
                          `${username}:${password}`,
                        )}`,
                      },
                    }).then((response) => {
                      console.log("Res:", response)
                      if (response.status === 200) {
                        const token: string = response.headers
                          .get("Authorization")
                          ?.split(" ")[1] as string
                        dispatch(setToken(token))
                        console.log("Log in successful")
                      } else {
                        console.log("Log in failed")
                      }
                    })
                  }}
                >
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="LoginDialogUserIDText"
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="LoginDialogPasswordText"
                  />
                  <br />
                  <br />
                  <Button id="PerformLoginButton" type="submit">
                    Login
                  </Button>
                </form> */}
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
                    fetch("https://localhost/api/authenticate", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${btoa(
                          `${username}:${password}`,
                        )}`,
                      },
                    }).then((response) => {
                      console.log("Res:", response)
                      if (response.status === 200) {
                        const token: string = response.headers
                          .get("Authorization")
                          ?.split(" ")[1] as string
                        dispatch(setToken(token))
                        console.log("Log in successful")
                      } else {
                        console.log("Log in failed")
                      }
                    })
                    // const credentials = btoa(`${username}:${password}`)
                    // dispatch(authenticateAsync(credentials))
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
        // <>
        //   {!showLogin && (
        //     <Button onClick={setShowLogin(true) as any}>Logo</Button>
        //   )}

        //   <Modal show={showLogin}>
        //     <Modal.Dialog>
        //       <Modal.Header>
        //         <Modal.Title>Login Window</Modal.Title>
        //       </Modal.Header>
        //       <Modal.Body>
        // <Form>
        //   <Form.Group>
        //     <Form.Label>Username:</Form.Label>
        //     <Form.Control
        //       id="LoginDialogUserIDText"
        //       type="text"
        //       placeholder="Your username"
        //     />
        //   </Form.Group>
        //   <Form.Group>
        //     <Form.Label>Password:</Form.Label>
        //     <Form.Control
        //       id="LoginDialogPasswordText"
        //       type="password"
        //       placeholder=""
        //     />
        //   </Form.Group>
        //   <Button
        //     id="PerformLoginButton"
        //     variant="primary"
        //     type="submit"
        //   >
        //     Log in
        //   </Button>
        // </Form>
        //       </Modal.Body>
        //       <Modal.Footer>
        //         {/* <Button variant="primary">Save changes</Button>
        //     <Button variant="secondary">Close</Button> */}
        //       </Modal.Footer>
        //     </Modal.Dialog>
        //   </Modal>
        // </>
      )}
      {isAuth && (
        <Button id="LogoutButton" onClick={() => dispatch(clearToken())}>
          Logout
        </Button>
      )}
    </div>
  )
}
