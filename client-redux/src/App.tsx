import "./App.css"
import { useAppSelector } from "./app/hooks"
import LandingPage from "./components/LandingPage"
import Startseite from "./components/Startseite"
import { selectLogin } from "./features/loginSlice"

function App() {
  const isLoggedIn = useAppSelector(selectLogin)
  return (
    <div className="App">
      {!isLoggedIn && <LandingPage />}
      {isLoggedIn && <Startseite />}
    </div>
  )
}

export default App
