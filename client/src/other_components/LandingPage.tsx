import Login from "../authentication/components/Login"
import LoginModal from "../authentication/components/LoginModal"
// import Banner from "./Banner"

export default function LandingPage() {
  return (
    <div id="LandingPage" className="centered middleBox">
      {/* <Banner /> */}
      <div
        className="centered"
        style={{
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "grey",
          height: "20rem",
          width: "40rem",
        }}
      >
        <h3>{`Welcome to the ${import.meta.env.VITE_UNI_NAME} Webpage`}</h3>
        <Login />
        <LoginModal />
      </div>
    </div>
  )
}
