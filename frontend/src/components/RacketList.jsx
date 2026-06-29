import RacketCard from "./RacketCard"

function RacketList({ 
    rackets,
    handleDeleteRacket,
    handleUpdateWeight,
    editingRacket,
    setEditingRacket 
}) {
    return (
        <div>
            {rackets.map((racket) => (
                <RacketCard
                key={racket.id}
                racket={racket}
                handleDeleteRacket={handleDeleteRacket}
                handleUpdateWeight={handleUpdateWeight}
                editingRacket={editingRacket}
                setEditingRacket={setEditingRacket}
                />
            ))}
        </div>
    )
}

export default RacketList   