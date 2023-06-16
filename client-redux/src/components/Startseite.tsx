import Login from "./Login"

export default function Startseite() {
  return (
    <div id="StartPage">
      <header
        style={{ position: "absolute", top: "0", right: "0", margin: "10px" }}
      >
        <Login />
      </header>
      <h1>Successfully logged in!</h1>
      {/* {users.map((user: any) => (
            <div key={user.id}>
                <h1>{user.firstName}</h1>
            </div>
            ))} */}
    </div>
  )
}
