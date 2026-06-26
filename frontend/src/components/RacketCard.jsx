function RacketCard({ racket, handleDeleteRacket, handleEditWeight }) {
    return (
        <div>
            <h2>
                {racket.brand} {racket.model}
            </h2>

            <p>Head Size: {racket.headSize} sq in</p>
            <p>Weight: {racket.weight} g</p>
            <p>String Pattern: {racket.stringPattern}</p>

            <button onClick={() => handleDeleteRacket(racket.id)}>
                Delete
            </button>

            <button onClick={() => handleEditWeight(racket)}>
                Add 5g
            </button>
        </div>
    )
}

export default RacketCard