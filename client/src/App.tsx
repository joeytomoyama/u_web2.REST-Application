import "./App.css"
import { useAppSelector } from "./app/hooks"
import LandingPage from "./components/LandingPage"
import Startseite from "./components/Startseite"
import UserManagementPage from "./components/UserManagementPage"
import { selectAuth } from "./features/authSlice"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<Startseite />} />
        <Route path="/usermanagement" element={<UserManagementPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    )
  }
}

export default App
