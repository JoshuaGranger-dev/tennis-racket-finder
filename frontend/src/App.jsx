import { useEffect, useState } from 'react'
import RacketList from "./components/RacketList"

function App() {
  const [rackets, setRackets] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedStringPattern, setSelectedStringPattern] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

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

  let filteredRackets = rackets

    if (selectedBrand !== "All") {
      filteredRackets = filteredRackets.filter((racket) => racket.brand === selectedBrand)
    } 
  
    if (selectedStringPattern !== "All") {
      filteredRackets = filteredRackets.filter((racket) => racket.stringPattern === selectedStringPattern)
    }

    if (searchTerm !== "") {
      filteredRackets = filteredRackets.filter((racket) => 
        racket.brand.toLowerCase().includes(searchTerm.toLowerCase())
        || racket.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

  return (
    <div>
      <h1>Tennis Racket Finder</h1>
      <input type="text"
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder ="Search by brand or model"
        />

      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="All">All</option>
        <option value="Wilson">Wilson</option>
        <option value="Babolat">Babolat</option>
        <option value="Yonex">Yonex</option>
      </select>

      <select value={selectedStringPattern} onChange={(e) => setSelectedStringPattern(e.target.value)}>
        <option value="All">All</option>
        <option value="16x19">16x19</option>
        <option value="18x20">18x20</option>
        <option value="16x20">16x20</option>
      </select>

      <RacketList rackets={filteredRackets} />
    </div>
  )
}

export default App