import React from "react"
import { login } from "../features/loginSlice"
import { useDispatch } from "react-redux"

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Logout() {
  const dispatch = useDispatch()
  return (
    <div id="LoginDialog">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const username = (
            document.getElementById("username") as HTMLInputElement
          ).value
          const password = (
            document.getElementById("password") as HTMLInputElement
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
              dispatch(login())
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
    </div>
  )
}
