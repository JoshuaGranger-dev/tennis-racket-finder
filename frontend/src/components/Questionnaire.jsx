import { useState } from "react"

function Questionnaire() {
  const [answers, setAnswers] = useState({
    currentStyle: "",
    desiredStyle: "",
    mainNeed: "",
    strugglesWithRacketHeadSpeed: "",
    armComfortPriority: "",
  })

  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState([])

  function handleChange(e) {
    const { name, value } = e.target

    setAnswers({
      ...answers,
      [name]: value,
    })
  }

  function getMatchStrength(score) {
    if (score >= 8) {
      return "Strong Match"
    }

    if (score >= 5) {
      return "Good Match"
    }

    return "Possible Match"
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)
    setError("")
    setRecommendations([])

    try {
      const response = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      })

      if (!response.ok) {
        throw new Error("Could not get recommendations")
      }

      const data = await response.json()

      setRecommendations(data)

      console.log("Questionnaire answers:", answers)
      console.log("Recommendations:", data)
    }catch (error) {
      console.error("Recommendation error:", error)
      setError("Could not get recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Find Your Racket</h2>

        <label>
          What is your current play style?
          <select
            name="currentStyle"
            value={answers.currentStyle}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="Aggressive Baseliner">Aggressive Baseliner</option>
            <option value="Counterpuncher">Counterpuncher</option>
            <option value="Pusher">Pusher</option>
            <option value="All-Court Player">All-Court Player</option>
            <option value="Serve-and-Volley">Serve-and-Volley</option>
            <option value="Doubles Player">Doubles Player</option>
            <option value="Beginner / Still Developing">Beginner / Still Developing</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </label>

        <label>
          What style do you want to move toward?
          <select
            name="desiredStyle"
            value={answers.desiredStyle}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="Same as current style">Same as current style</option>
            <option value="Aggressive Baseliner">Aggressive Baseliner</option>
            <option value="Counterpuncher">Counterpuncher</option>
            <option value="All-Court Player">All-Court Player</option>
            <option value="Serve-and-Volley">Serve-and-Volley</option>
            <option value="Doubles Player">Doubles Player</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </label>

        <label>
          What do you need most right now?
          <select
            name="mainNeed"
            value={answers.mainNeed}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="Power">Power</option>
            <option value="Control">Control</option>
            <option value="Spin">Spin</option>
            <option value="Comfort">Comfort</option>
            <option value="Maneuverability">Maneuverability</option>
            <option value="Stability">Stability</option>
          </select>
        </label>

        <label>
          Do you have trouble generating racket head speed?
          <select
            name="strugglesWithRacketHeadSpeed"
            value={answers.strugglesWithRacketHeadSpeed}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </label>

        <label>
          Is arm comfort a high priority for you?
          <select
            name="armComfortPriority"
            value={answers.armComfortPriority}
            onChange={handleChange}
          >
            <option value="">Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Somewhat">Somewhat</option>
          </select>
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Getting recommendations..." : "Get Recommendation"}
        </button>

        {error && <p>{error}</p>}

      </form>

      {isLoading && <p>Finding your best racket matches...</p>}

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Your Top 5 Racket Matches</h3>

          <div className="recommendation-grid">
            {recommendations.map((racket) => (
              <div className="recommendation-card" key={racket.id}>
                <div className="card-image">
                  {racket.imageUrl ? (
                    <img
                      src={racket.imageUrl}
                      alt={`${racket.brand} ${racket.model}`}
                      className="racket-image"
                    />
                  ) : (
                    <div className="racket-image-placeholder">
                      {racket.brand}
                    </div>
                  )}
                </div>

                <div className="card-content">
                  <div className="recommendation-header">
                    <div className="title-row">
                      <h4>{racket.brand} {racket.model}</h4>
                      <span className="match-badge">{getMatchStrength(racket.score)}</span>
                    </div>

                    <p className="strengths">{racket.bestFor?.split(",").slice(0,4).join(", ") || "General fit"}</p>
                  </div>

                  <div className="spec-row">
                    <span>{racket.headSize} sq in</span>
                    <span>{racket.weight}g</span>
                    <span>{racket.swingweight} SW</span>
                    <span>{racket.stringPattern}</span>
                    <span>{racket.balancePoints} pts</span>
                  </div>

                  <div className="pros-cons">
                    <div>
                      <h4>Pros</h4>
                      {racket.reasons.length > 0 ? (
                        <ul>
                          {racket.reasons.slice(0, 3).map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No strong match reasons yet.</p>
                      )}
                    </div>

                    {racket.tradeoffs && racket.tradeoffs.length > 0 && (
                      <div>
                        <h4>Cons</h4>
                        <ul>
                          {racket.tradeoffs.slice(0, 2).map((tradeoff, index) => (
                            <li key={index}>{tradeoff}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Questionnaire