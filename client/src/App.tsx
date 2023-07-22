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
  if (!isAuth) {
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coursemanagement" element={<CourseManagementPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    )
  } else {
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <Header />
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
      </div>
    )
  }
  // return (
  //   <div
  //     style={{
  //       height: "100%",
  //     }}
  //   >
  //     <Header />
  //     <Routes>
  //       <Route path="/" element={<Startseite />} />
  //       <Route path="/usermanagement" element={<UserManagementPage />} />
  //       <Route path="/coursemanagement" element={<CourseManagementPage />} />
  //       <Route
  //         path="/applicationmanagement"
  //         element={<ApplicationManagementPage />}
  //       />
  //       <Route path="/profile" element={<Profile />} />
  //       <Route path="*" element={<div>404</div>} />
  //     </Routes>
  //   </div>
  // )
}

export default App
