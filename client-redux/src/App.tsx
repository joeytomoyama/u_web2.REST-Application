import "./App.css"
import { useAppSelector } from "./app/hooks"
import LandingPage from "./components/LandingPage"
import Startseite from "./components/Startseite"
import { selectAuth } from "./features/authSlice"

function App() {
  const isAuth = useAppSelector(selectAuth).isAuthenticated
  return (
    <div className="App">
      {!isAuth && <LandingPage />}
      {isAuth && <Startseite />}
    </div>
  )
}

export default App
