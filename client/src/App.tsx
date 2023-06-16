import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Startseite from "./components/Startseite";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn && <LandingPage setLoggedIn={setLoggedIn} />}
      {loggedIn && <Startseite />}
    </>
  );
}

export default App;
