import { useState } from "react"
import Login from "./Login"
import LoginModal from "./LoginModal"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div
      id="LandingPage"
      className="centered"
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100%",
      // }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "5px",
          backgroundColor: "grey",
          height: "20rem",
          width: "40rem",
        }}
      >
        <h3>{`Welcome to the ${import.meta.env.VITE_UNI_NAME} Webpage`}</h3>
        <Login />
      </div>
      {/* <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} /> */}
    </div>
  )
}
