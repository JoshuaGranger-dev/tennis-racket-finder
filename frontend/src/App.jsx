import { useEffect, useState } from 'react'
import RacketList from "./components/RacketList"

function App() {
  const [rackets, setRackets] = useState([])

  useEffect(() => {
    console.log("useEffect is running")

    fetch("http://localhost:5000/rackets")
      .then((res) => res.json())
      .then((data) => {
        setRackets(data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1>Tennis Racket Finder</h1>
      <RacketList rackets={rackets} />
    </div>
  )
}

export default App