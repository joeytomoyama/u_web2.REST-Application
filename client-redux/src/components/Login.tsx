import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
import { clearToken, selectAuth, setToken } from "../features/authSlice"

// interface LoginProps {
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
// }

export default function Login() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  const dispatch = useDispatch()
  return (
    <div id="LoginDialog">
      {!isAuth && (
        <form
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
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
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
          <input type="text" name="username" id="LoginDialogUserIDText" />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="LoginDialogPasswordText" />
          <br />
          <br />
          <button id="PerformLoginButton" type="submit">
            Login
          </button>
        </form>
      )}
      {isAuth && (
        <button id="LogoutButton" onClick={() => dispatch(clearToken())}>
          Logout
        </button>
      )}
    </div>
  )
}
