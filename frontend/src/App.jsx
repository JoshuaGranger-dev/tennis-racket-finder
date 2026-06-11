import { useEffect, useState } from 'react'

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
      
      {rackets.map((racket) => (
        <div key={racket.id}>
          <h2>
            {racket.brand} {racket.model}
          </h2>

          <p>Head Size: {racket.headSize} sq in</p>
          <p>Weight: {racket.weight} g</p>
          <p>String Patter: {racket.stringPattern}</p>

        </div>
      ))}
    </div>
  )
}

export default App