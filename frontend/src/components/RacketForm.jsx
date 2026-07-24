import { useState } from "react"

function RacketForm({ handleAddRacket }) {

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [headSize, setHeadSize] = useState("")
    const [weight, setWeight] = useState("")
    const [stringPattern, setStringPattern] = useState("")
    const [swingweight, setSwingweight] = useState("")
    const [balancePoints, setBalancePoints] = useState("")
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
            !balancePoints === "" ||
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
            balancePoints: Number(balancePoints),
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
        setBalancePoints("")
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
                type="number" 
                value={balancePoints}
                onChange={(e) => setBalancePoints(e.target.value)}
                placeholder="Balance points"
            />

            <p>Negative = head light, 0 = even, positive = head heavy</p>

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