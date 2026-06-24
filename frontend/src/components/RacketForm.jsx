import { useState } from "react"

function RacketForm({ handleAddRacket }) {

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [headSize, setHeadSize] = useState("")
    const [weight, setWeight] = useState("")
    const [stringPattern, setStringPattern] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        const newRacket = {
            brand,
            model,
            headSize: Number(headSize),
            weight: Number(weight),
            stringPattern
        }

        handleAddRacket(newRacket)

        setBrand("")
        setModel("")
        setHeadSize("")
        setWeight("")
        setStringPattern("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a Racket</h2>

            <input 
                type="text" 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand"
            />

            <input 
                type="text" 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
            />

            <input 
                type="number"
                value={headSize} 
                onChange={(e) => setHeadSize(e.target.value)}
                placeholder="Head Size"
            />

            <input 
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="Weight"
            />

            <input 
                type="text"
                value={stringPattern} 
                onChange={(e) => setStringPattern(e.target.value)}
                placeholder="String Pattern"
            />

            <button type="submit">Add Racket</button>

        </form>
    )
}

export default RacketForm