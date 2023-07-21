import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../app/hooks"
import Button from "react-bootstrap/Button"
import {
  selectAuth,
  clearToken,
  showAuthModal,
  hideAuthModal,
} from "../features/authSlice"
import { useNavigate } from "react-router-dom"

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
            onClick={() => {
              dispatch(showAuthModal())
              navigate("/")
            }}
          >
            Log in
          </Button>
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
