
function RacketCard({ racket }) {
  function formatBalance(balancePoints) {
    if (balancePoints === null || balancePoints === undefined) {
      return "Not Listed"
    }

    if (balancePoints < 0) {
      return `${balancePoints} Head Light`
    }

    if (balancePoints > 0) {
      return `+${balancePoints} Head Heavy`
    }

    return "0 Even Balance"
  }

  return (
    <div className="racket-card">
      <div className="racket-card-image">
        {racket.imageUrl ? (
          <img
            src={racket.imageUrl}
            alt={`${racket.brand} ${racket.model}`}
            className="browse-racket-image"
          />
        ) : (
          <div className="browse-image-placeholder">
            {racket.brand}
          </div>
        )}
      </div>

      <div className="racket-card-content">
        <div className="racket-card-header">
          <h3>{racket.brand} {racket.model}</h3>
          <span className="play-style-badge">{racket.playStyle || "General"}</span>
        </div>

        <div className="browse-spec-row">
          <span>{racket.headSize} sq in</span>
          <span>{racket.weight}g</span>
          <span>{racket.swingweight} SW</span>
          <span>{racket.stringPattern}</span>
          <span>{formatBalance(racket.balancePoints)}</span>
        </div>

        <div className="racket-details">
          <p>Stiffness: {racket.stiffness || "Not listed"}</p>
          <p>Beam Width: {racket.beamWidth || "Not listed"}</p>
        </div>
      </div>
    </div>
  )
}

export default RacketCard