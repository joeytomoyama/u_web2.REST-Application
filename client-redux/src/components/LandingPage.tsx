import Login from "./Login"

// interface LoginProps {
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
// }

export default function LandingPage() {
  return (
    <div id="LandingPage">
      <header
        style={{ position: "absolute", top: "0", right: "0", margin: "10px" }}
      >
        <Login />
      </header>
      <h1>Landing Page</h1>
    </div>
  )
}
