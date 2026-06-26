import RacketCard from "./RacketCard"

function RacketList({ rackets, handleDeleteRacket, handleEditWeight, editingRacket, setEditingRacket }) {
    return (
        <div>
            {rackets.map((racket) => (
                <RacketCard
                key={racket.id}
                racket={racket}
                handleDeleteRacket={handleDeleteRacket}
                handleEditWeight={handleEditWeight}
                editingRacket={editingRacket}
                setEditingRacket={setEditingRacket}
                />
            ))}
        </div>
    )
}

export default RacketList   