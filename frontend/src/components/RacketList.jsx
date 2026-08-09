import RacketCard from "./RacketCard"

function RacketList({ 
    rackets 
}) {
    return (
        <div className="racket-list">
            {rackets.map((racket) => (
                <RacketCard
                key={racket.id}
                racket={racket}
                />
            ))}
        </div>
    )
}

export default RacketList   