import "./App.css"
import { useAppSelector } from "./app/hooks"
import ApplicationManagementPage from "./application/components/ApplicationManagementPage"
import CourseManagementPage from "./course/components/CourseManagementPage"
import Header from "./other_components/Header"
import LandingPage from "./other_components/LandingPage"
import Profile from "./other_components/Profile"
import Startseite from "./other_components/Startseite"
import UserManagementPage from "./user/components/UserManagementPage"
import { selectAuth } from "./authentication/features/authSlice"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Footer from "./other_components/Footer"
import { Spinner } from "react-bootstrap"
import SpinnerElement from "./other_components/SpinnerElement"
import NotFound from "./other_components/NotFound"
import NotAllowed from "./other_components/NotAllowed"

function App() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  const isAdmin = useAppSelector(selectAuth).isAdministrator
  document.title = import.meta.env.VITE_UNI_NAME + " React App"

  return (
    <div>
      <SpinnerElement />
      <Header />
      <div className="centered">
        <main>
          {isAuth ? (
            <Routes>
              <Route path="/" element={<Startseite />} />

              {isAdmin ? (
                <Route
                  path="/usermanagement"
                  element={<UserManagementPage />}
                />
              ) : (
                <Route path="/usermanagement" element={<NotAllowed />} />
              )}
              <Route
                path="/coursemanagement"
                element={<CourseManagementPage />}
              />
              {isAdmin ? (
                <Route
                  path="/applicationmanagement"
                  element={<ApplicationManagementPage />}
                />
              ) : (
                <Route path="/applicationmanagement" element={<NotAllowed />} />
              )}
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/usermanagement" element={<NotAllowed />} />
              <Route path="/coursemanagement" element={<NotAllowed />} />
              <Route path="/applicationmanagement" element={<NotAllowed />} />
              <Route path="/profile" element={<NotAllowed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
