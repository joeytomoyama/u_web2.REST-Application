import "./App.css"
import { useAppSelector } from "./app/hooks"
import ApplicationManagementPage from "./application/components/ApplicationManagementPage"
import CourseManagementPage from "./course/components/CourseManagementPage"
import Header from "./components/Header"
import LandingPage from "./components/LandingPage"
import Profile from "./components/Profile"
import Startseite from "./components/Startseite"
import UserManagementPage from "./user/components/UserManagementPage"
import { selectAuth } from "./authentication/features/authSlice"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  const isAdmin = useAppSelector(selectAuth).isAdministrator
  return (
    <div
      style={
        {
          // height: "100%",
        }
      }
    >
      <Header />
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Startseite />} />
          <Route path="/usermanagement" element={<UserManagementPage />} />
          <Route path="/coursemanagement" element={<CourseManagementPage />} />
          <Route
            path="/applicationmanagement"
            element={<ApplicationManagementPage />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/usermanagement" element={<div>not allowed</div>} />
          <Route path="/coursemanagement" element={<div>not allowed</div>} />
          <Route
            path="/applicationmanagement"
            element={<div>not allowed</div>}
          />
          <Route path="/profile" element={<div>not allowed</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      )}
      {/* <Routes>
        {isAuth ? (
          <Route path="/" element={<Startseite />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
        {isAdmin && (
          <Route path="/usermanagement" element={<UserManagementPage />} />
        )}
        <Route path="/coursemanagement" element={<CourseManagementPage />} />
        {isAdmin && (
          <Route
            path="/applicationmanagement"
            element={<ApplicationManagementPage />}
          />
        )}
        {isAuth && <Route path="/profile" element={<Profile />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes> */}
    </div>
  )
}

export default App
