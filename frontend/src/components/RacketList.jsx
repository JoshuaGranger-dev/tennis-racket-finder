import RacketCard from "./RacketCard"

function RacketList({ rackets, handleDeleteRacket, handleEditWeight }) {
    return (
        <div>
            {rackets.map((racket) => (
                <RacketCard
                key={racket.id}
                racket={racket}
                handleDeleteRacket={handleDeleteRacket}
                handleEditWeight={handleEditWeight}
                />
            ))}
        </div>
    )
}

export default RacketList   