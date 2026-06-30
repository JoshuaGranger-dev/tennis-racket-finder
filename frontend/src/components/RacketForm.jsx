import { useState } from "react"

function RacketForm({ handleAddRacket }) {

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [headSize, setHeadSize] = useState("")
    const [weight, setWeight] = useState("")
    const [stringPattern, setStringPattern] = useState("")
    const [swingweight, setSwingweight] = useState("")
    const [balance, setBalance] = useState("")
    const [stiffness, setStiffness] = useState("")
    const [beamWidth, setBeamWidth] = useState("")
    const [playStyle, setPlayStyle] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        if (!brand ||
            !model ||
            !headSize ||
            !weight ||
            !stringPattern ||
            !swingweight ||
            !balance ||
            !stiffness ||
            !beamWidth ||
            !playStyle
        ) {
            setError("Please fill out all fields")
            return
        }

        setError("")

        const newRacket = {
            brand,
            model,
            headSize: Number(headSize),
            weight: Number(weight),
            stringPattern,
            swingweight: Number(swingweight),
            balance,
            stiffness: Number(stiffness),
            beamWidth,
            playStyle,
        }

        handleAddRacket(newRacket)

        setBrand("")
        setModel("")
        setHeadSize("")
        setWeight("")
        setStringPattern("")
        setSwingweight("")
        setBalance("")
        setStiffness("")
        setBeamWidth("")
        setPlayStyle("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a Racket</h2>

            {error && <p>{error}</p>}

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

            <input 
                type="number" 
                value={swingweight}
                onChange={(e) => setSwingweight(e.target.value)}
                placeholder="Swingweight"
            />

            <input 
                type="text" 
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Balance"
            />

            <input 
                type="number" 
                value={stiffness}
                onChange={(e) => setStiffness(e.target.value)}
                placeholder="Stiffness"
            />

            <input
                type="text"
                value={beamWidth}
                onChange={(e) => setBeamWidth(e.target.value)}
                placeholder="Beam Width"
            />

            <input 
                type="text" 
                value={playStyle}
                onChange={(e) => setPlayStyle(e.target.value)}
                placeholder="Play Style"
            />

            <button type="submit">Add Racket</button>
        </form>
    )
}

export default RacketForm