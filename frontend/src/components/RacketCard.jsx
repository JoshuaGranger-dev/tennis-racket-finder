import { useState } from "react"

function RacketCard({ racket, handleDeleteRacket, editingRacket, setEditingRacket, handleUpdateWeight }) {

    const [editedWeight, setEditedWeight] = useState(racket.weight)
    const isEditing = editingRacket === racket.id 

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

            <button onClick={() => handleDeleteRacket(racket.id)}>
                Delete
            </button>

            <button onClick={() => {
                setEditingRacket(racket.id)
                setEditedWeight(racket.weight)
            }}>
                Edit Weight
            </button>
            

        </div>
    )
}

export default RacketCard