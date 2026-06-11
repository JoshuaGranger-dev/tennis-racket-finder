function RacketCard({ racket }) {
    return (
        <div>
            <h2>
                {racket.brand} {racket.model}
            </h2>

            <p>Head Size: {racket.headSize} sq in</p>
            <p>Weight: {racket.weight} g</p>
            <p>String Pattern: {racket.stringPattern}</p>
        </div>
    )
}

export default RacketCard