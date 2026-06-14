import { useEffect, useState } from 'react'
import RacketList from "./components/RacketList"

function App() {
  const [rackets, setRackets] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("All")

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

  const filteredRackets = selectedBrand === "All"
    ? rackets 
    : rackets.filter((racket) => racket.brand === selectedBrand)

  return (
    <div>
      <h1>Tennis Racket Finder</h1>
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="All">All</option>
        <option value="Wilson">Wilson</option>
        <option value="Babolat">Babolat</option>
        <option value="Yonex">Yonex</option>
      </select>
      <RacketList rackets={filteredRackets} />
    </div>
  )
}

export default App