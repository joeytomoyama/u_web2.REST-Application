import Login from "./authentication/components/Login"
import LoginModal from "./authentication/components/LoginModal"

export default function LandingPage() {
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
        className="centered"
        style={{
          flexDirection: "column",
          borderRadius: "5px",
          backgroundColor: "grey",
          height: "20rem",
          width: "40rem",
        }}
      >
        <h3>{`Welcome to the ${import.meta.env.VITE_UNI_NAME} Webpage`}</h3>
        <Login />
        <LoginModal />
      </div>
      {/* <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} /> */}
    </div>
  )
}
