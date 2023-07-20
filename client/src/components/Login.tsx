import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../app/hooks"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import {
  selectAuth,
  clearToken,
  showAuthModal,
  hideAuthModal,
} from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import LoginModal from "./LoginModal"

export default function Login() {
  const authSlice = useAppSelector(selectAuth)
  const isAuth = authSlice.isAuthenticated
  const dispatch = useDispatch()

  // const [showLogin, setShowLogin] = React.useState(false)

  const navigate = useNavigate()
  return (
    <div>
      {!isAuth && (
        <>
          <Button
            id="OpenLoginDialogButton"
            onClick={() => dispatch(showAuthModal())}
          >
            Log in
          </Button>
          {/* <LoginModal /> */}
        </>
      )}
      {isAuth && (
        <Button
          id="LogoutButton"
          onClick={() => {
            // setShowLogin(false)
            dispatch(clearToken())
            dispatch(hideAuthModal())
            navigate("/")
          }}
        >
          Logout
        </Button>
      )}
    </div>
  )
}
