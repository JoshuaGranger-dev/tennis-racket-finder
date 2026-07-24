import { useState } from "react"

function RacketCard({ racket, handleDeleteRacket, editingRacket, setEditingRacket, handleUpdateWeight }) {

    const [editedWeight, setEditedWeight] = useState(racket.weight)
    const isEditing = editingRacket === racket.id 

    function formatBalance(balancePoints) {
        if (balancePoints === null || balancePoints === undefined) {
            return "Not Listed"
        }

        if (balancePoints < 0) {
            return `${balancePoints} Head Light`
        }

        if (balancePoints < 0) {
            return `${balancePoints} Head Heavy`
        }

        return "0 Even Balance"
    }

    return (
        <div>
            <h2>
                {racket.brand} {racket.model}
            </h2>

            <p>Head Size: {racket.headSize} sq in</p>
            {isEditing ? (
                <div>
                    <input 
                        type="number" 
                        value={editedWeight}
                        onChange={(e) => setEditedWeight(e.target.value)} 
                        placeholder="New Weight"
                    />

                    <button onClick={() => handleUpdateWeight(racket.id, editedWeight)}>
                        Save
                    </button>

                    <button onClick={() => setEditingRacket(null)}>
                        Cancel
                    </button>

                </div>
            ) : (
                <p>Weight: {racket.weight} g</p>
            )}
            <p>String Pattern: {racket.stringPattern}</p>

            <p>Swingweight: {racket.swingweight}</p>

            <p>Balance: {formatBalance(racket.balancePoints)}</p>

            <p>Stiffness: {racket.stiffness}</p>

            <p>Beam Width: {racket.beamWidth}</p>

            <p>Play Style: {racket.playStyle}</p>

            <button onClick={() => handleDeleteRacket(racket.id)}>
                Delete
            </button>

            {!isEditing && (
                <button onClick={() => {
                    setEditingRacket(racket.id)
                    setEditedWeight(racket.weight)
                }}>
                    Edit Weight
                </button>
            )}
            

        </div>
    )
}

export default RacketCard