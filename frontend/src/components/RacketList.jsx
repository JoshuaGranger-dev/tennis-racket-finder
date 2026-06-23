import RacketCard from "./RacketCard"

function RacketList({ rackets, handleDeleteRacket }) {
    return (
        <div>
            {rackets.map((racket) => (
                <RacketCard
                key={racket.id}
                racket={racket}
                handleDeleteRacket={handleDeleteRacket}
                />
            ))}
        </div>
    )
}

export default RacketList   