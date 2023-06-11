import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import Startseite from './components/Startseite'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
//   const [token, setToken] = useState('')

//   useEffect(() => {
//     fetch('http://localhost/api/authenticate', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${btoa('admin:123')}`
//       }
//     })
//     .then((response) => response.headers.get('Authorization'))
//     .then((data) => setToken(data as string))
//   }, [])

//   useEffect(() => {
//     console.log('token', token.split(' ')[1])
//   }, [token])


  return (
	<>
		{!loggedIn && <LandingPage setLoggedIn={setLoggedIn} />}
		{loggedIn && <Startseite />}
	</>
  )
}

export default App
