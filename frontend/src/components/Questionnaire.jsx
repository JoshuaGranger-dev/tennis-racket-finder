import { useState } from "react"

function Questionnaire({ rackets }) {
  const [answers, setAnswers] = useState({
    currentStyle: "",
    desiredStyle: "",
    mainNeed: "",
    strugglesWithRacketHeadSpeed: "",
    armComfortPriority: "",
  })

  const [recommendations, setRecommendations] = useState([])

  function handleChange(e) {
    const { name, value } = e.target

    setAnswers({
      ...answers,
      [name]: value,
    })
  }

  function hasBalancePoints(racket) {
    return racket.balancePoints !== null && racket.balancePoints !== undefined
  }

  function scoreMainNeed(racket, reasons) {
    let score = 0

    if (answers.mainNeed === "Power") {
      if (racket.headSize >= 100) {
        score += 2
        reasons.push("Larger head size can help with power")
      }

      if (racket.stiffness >= 67) {
        score += 2
        reasons.push("Higher stiffness can return more energy to the ball")
      }

      if (racket.swingweight >= 320) {
        score += 2
        reasons.push("Higher swingweight can add power and plow-through")
      }

      if (hasBalancePoints(racket) && racket.balancePoints >= 0) {
        score += 1
        reasons.push("Less head-light balance may help with power")
      }
    }

    if (answers.mainNeed === "Control") {
      if (racket.headSize <= 98) {
        score += 2
        reasons.push("Smaller head size can help with control")
      }

      if (racket.stiffness <= 65) {
        score += 2
        reasons.push("Lower stiffness can improve feel and control")
      }

      if (racket.weight >= 305) {
        score += 2
        reasons.push("Heavier weight can improve control through stability")
      }

      if (racket.stringPattern === "18x20") {
        score += 2
        reasons.push("Denser string pattern can improve directional control")
      }
    }

    if (answers.mainNeed === "Spin") {
      if (racket.stringPattern === "16x19") {
        score += 2
        reasons.push("Open string pattern can help with spin")
      }

      if (racket.headSize >= 100) {
        score += 2
        reasons.push("Larger head size can provide a more forgiving spin window")
      }

      if (racket.weight <= 305) {
        score += 2
        reasons.push("Manageable weight can help generate racket head speed for spin")
      }

      if (racket.swingweight <= 325) {
        score += 1
        reasons.push("Moderate swingweight may make spin easier to generate")
      }
    }

    if (answers.mainNeed === "Comfort") {
      if (racket.stiffness <= 65) {
        score += 2
        reasons.push("Lower stiffness may be more arm-friendly")
      }

      if (racket.weight >= 300) {
        score += 2
        reasons.push("More mass can reduce harsh impact feel")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 2
        reasons.push("Head-light balance may feel easier on the arm")
      }
    }

    if (answers.mainNeed === "Maneuverability") {
      if (racket.weight <= 305) {
        score += 2
        reasons.push("Lower weight may be easier to swing")
      }

      if (racket.swingweight <= 322) {
        score += 2
        reasons.push("Lower swingweight can improve maneuverability")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 2
        reasons.push("Head-light balance may make the racket easier to maneuver")
      }
    }

    if (answers.mainNeed === "Stability") {
      if (racket.weight >= 305) {
        score += 2
        reasons.push("Heavier weight can improve stability")
      }

      if (racket.swingweight >= 325) {
        score += 2
        reasons.push("Higher swingweight can improve stability through contact")
      }

      if (hasBalancePoints(racket) && racket.balancePoints >= 0) {
        score += 1
        reasons.push("Less head-light balance may improve stability")
      }
    }

    return score
  }

  function scoreRacketHeadSpeed(racket, reasons) {
    let score = 0

    if (answers.strugglesWithRacketHeadSpeed === "Yes") {
      if (racket.weight <= 305) {
        score += 2
        reasons.push("Lower weight may help you swing faster")
      }

      if (racket.swingweight <= 322) {
        score += 2
        reasons.push("Lower swingweight may help with racket head speed")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 1
        reasons.push("Head-light balance can make the racket feel quicker")
      }
    }

    if (answers.strugglesWithRacketHeadSpeed === "Not Sure") {
      if (racket.weight <= 305) {
        score += 1
        reasons.push("Manageable weight may be a safer choice if swing speed is uncertain")
      }
    }

    return score
  }

  function scoreArmComfort(racket, reasons) {
    let score = 0

    if (answers.armComfortPriority === "Yes") {
      if (racket.stiffness <= 65) {
        score += 2
        reasons.push("Lower stiffness may be more arm-friendly")
      }

      if (racket.weight >= 300) {
        score += 1
        reasons.push("More mass can help absorb impact")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 1
        reasons.push("Head-light balance may reduce strain during swings")
      }
    }

    if (answers.armComfortPriority === "Somewhat") {
      if (racket.stiffness <= 65) {
        score += 1
        reasons.push("Lower stiffness may provide some added comfort")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 1
        reasons.push("Head-light balance may feel easier to swing")
      }
    }

    return score
  }

  function scoreDesiredStyle(racket, reasons) {
    let score = 0

    if (answers.desiredStyle === "Aggressive Baseliner") {
      if (racket.stringPattern === "16x19") {
        score += 1
        reasons.push("Open string pattern can support aggressive baseline spin")
      }

      if (racket.swingweight >= 320) {
        score += 1
        reasons.push("Solid swingweight can help drive through baseline shots")
      }
    }

    if (answers.desiredStyle === "All-Court Player") {
      if (racket.weight <= 315 && racket.weight >= 295) {
        score += 1
        reasons.push("Moderate weight can fit an all-court style")
      }

      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 1
        reasons.push("Head-light balance can help with quick transitions and net play")
      }
    }

    if (answers.desiredStyle === "Serve-and-Volley" || answers.desiredStyle === "Doubles Player") {
      if (hasBalancePoints(racket) && racket.balancePoints < 0) {
        score += 1
        reasons.push("Head-light balance can help with quick volleys")
      }

      if (racket.weight <= 310) {
        score += 1
        reasons.push("Manageable weight can help with quick reactions at net")
      }
    }

    if (answers.desiredStyle === "Counterpuncher") {
      if (racket.headSize >= 100) {
        score += 1
        reasons.push("Larger head size can add forgiveness for defensive play")
      }

      if (racket.weight <= 305) {
        score += 1
        reasons.push("Manageable weight can help with quick defensive swings")
      }
    }

    return score
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

  function getBestFor(racket) {
    const bestFor = []

    if (answers.mainNeed) {
      bestFor.push(answers.mainNeed)
    }

    if (answers.desiredStyle && answers.desiredStyle !== "Same as current style") {
      bestFor.push(answers.desiredStyle)
    }

    if (answers.strugglesWithRacketHeadSpeed === "Yes") {
      bestFor.push("Easy swing speed")
    }

    if (answers.armComfortPriority === "Yes") {
      bestFor.push("Arm comfort")
    }

    if (answers.armComfortPriority === "Somewhat") {
      bestFor.push("Some comfort")
    }

    return bestFor.join(", ")
  }

  function getRecommendations() {
    const scoredRackets = rackets.map((racket) => {
      let score = 0
      const reasons = []

      score += scoreMainNeed(racket, reasons)
      score += scoreRacketHeadSpeed(racket, reasons)
      score += scoreArmComfort(racket, reasons)
      score += scoreDesiredStyle(racket, reasons)

      return {
        ...racket,
        score,
        reasons,
        bestFor: getBestFor(racket),
      }
    })

    return scoredRackets
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const topRecommendations = getRecommendations()

    setRecommendations(topRecommendations)

    console.log("Questionnaire answers:", answers)
    console.log("Recommendations:", topRecommendations)
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

        <button type="submit">Get Recommendation</button>
      </form>

      {recommendations.length > 0 && (
        <div>
          <h3>Your Recommendations</h3>

          {recommendations.map((racket) => (
            <div key={racket.id}>
              <h4>
                {racket.brand} {racket.model}
              </h4>

              <p>Match: {getMatchStrength(racket.score)}</p>
              <p>Best for: {racket.bestFor || "General fit"}</p>
              <p>Score: {racket.score}</p>

              {racket.reasons.length > 0 ? (
                <ul>
                  {racket.reasons.slice(0, 4).map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              ) : (
                <p>No strong match reasons yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Questionnaire