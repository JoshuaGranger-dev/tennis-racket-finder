import { useEffect, useState } from 'react'
import RacketList from "./components/RacketList"
import FilterPanel from "./components/FilterPanel"
import RacketForm from "./components/RacketForm"

function App() {
  const [rackets, setRackets] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedStringPattern, setSelectedStringPattern] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {

    fetch("http://localhost:5000/rackets")
      .then((res) => res.json())
      .then((data) => {
        setRackets(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError("Could not load rackets. Make sure the backend server is running.")
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading Rackets...</p>
  }

  if (error) {
    return <p>{error}</p>
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

  function handleDeleteRacket(id) {
    fetch(`http://localhost:5000/rackets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setRackets(rackets.filter((racket) => racket.id !== id))
      })
      .catch((error)  => {
        console.error(error)
      })
  }

  function handleAddRacket(newRacket) {
    fetch("http://localhost:5000/rackets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newRacket),
    })
      .then((res) => res.json())
      .then((createdRacket) => {
        setRackets([ ...rackets, createdRacket])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <h1>Tennis Racket Finder</h1>

      <RacketForm
        handleAddRacket={handleAddRacket}
      />

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

      <RacketList 
        rackets={filteredRackets}
        handleDeleteRacket={handleDeleteRacket}
      />
    </div>
  )
}

export default App