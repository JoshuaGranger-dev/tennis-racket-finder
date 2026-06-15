import { useEffect, useState } from 'react'
import RacketList from "./components/RacketList"
import FilterPanel from "./components/FilterPanel"

function App() {
  const [rackets, setRackets] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedStringPattern, setSelectedStringPattern] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("useEffect is running")

    fetch("http://localhost:5000/rackets")
      .then((res) => res.json())
      .then((data) => {
        setRackets(data)
        setIsLoading(false)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading Rackets...</p>
  }

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
      <FilterPanel
        searchTerm={searchTerm}  
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedStringPattern={selectedStringPattern}
        setSelectedStringPattern={setSelectedStringPattern}
      />

      <p>Showing {filteredRackets.length} of {rackets.length} rackets</p>
      {filteredRackets.length === 0 && (
        <p>No rackets match your filters.</p>
      )}

      <RacketList rackets={filteredRackets} />
    </div>
  )
}

export default App