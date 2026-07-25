const express = require("express")
const pool = require("../db")

const router = express.Router()

function formatRacket(row) {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    headSize: row.head_size,
    weight: row.weight,
    swingweight: row.swingweight,
    balancePoints: row.balance_points,
    stiffness: row.stiffness,
    beamWidth: row.beam_width,
    stringPattern: row.string_pattern,
    playStyle: row.play_style,
  }
}

function hasBalancePoints(racket) {
  return racket.balancePoints !== null && racket.balancePoints !== undefined
}

function scoreMainNeed(racket, answers, reasons) {
  let score = 0

  if (answers.mainNeed === "Power") {
    if (racket.headSize >= 100) {
      score += 2
      reasons.push("The larger head size should make it easier to create power and get a more forgiving response.")
    }

    if (racket.stiffness >= 67) {
      score += 2
      reasons.push("The firmer frame should return more energy to the ball for easier pace.")
    }

    if (racket.swingweight >= 320) {
      score += 2
      reasons.push("The higher swingweight should help the racket drive through the ball with more depth.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints >= 0) {
      score += 1
      reasons.push("The balance gives the racket more mass toward the head, which can help with easier depth.")
    }
  }

  if (answers.mainNeed === "Control") {
    if (racket.headSize <= 98) {
      score += 2
      reasons.push("The smaller head size should give you a more precise response on full swings.")
    }

    if (racket.stiffness <= 65) {
      score += 2
      reasons.push("The softer flex should improve feel and make it easier to control the ball.")
    }

    if (racket.weight >= 305) {
      score += 2
      reasons.push("The added weight should help the racket stay stable through contact.")
    }

    if (racket.stringPattern === "18x20") {
      score += 2
      reasons.push("The denser string pattern should give you a lower, more controlled launch angle.")
    }
  }

  if (answers.mainNeed === "Spin") {
    if (racket.stringPattern === "16x19") {
      score += 2
      reasons.push("The open string pattern should make it easier to generate spin.")
    }

    if (racket.headSize >= 100) {
      score += 2
      reasons.push("The larger head size gives you a bigger spin window and more forgiveness.")
    }

    if (racket.weight <= 305) {
      score += 2
      reasons.push("The manageable weight should help you accelerate the racket for more racket head speed.")
    }

    if (racket.swingweight <= 325) {
      score += 1
      reasons.push("The moderate swingweight should make it easier to whip through the ball.")
    }
  }

  if (answers.mainNeed === "Comfort") {
    if (racket.stiffness <= 58) {
      score += 7
      reasons.push("The extremely low stiffness should make this one of the most arm-friendly options.")
    } else if (racket.stiffness <= 60) {
      score += 5
      reasons.push("The very soft flex should make this one of the more arm-friendly options.")
    } else if (racket.stiffness <= 63) {
      score += 3
      reasons.push("The softer flex should help reduce harsh feedback at contact.")
    } else if (racket.stiffness <= 65) {
      score += 1
      reasons.push("The moderate flex should give this racket some added comfort.")
    }

    if (racket.headSize >= 100) {
      score += 3
      reasons.push("The larger head size should make off-center contact more forgiving.")
    }

    if (racket.weight >= 290 && racket.weight <= 305) {
      score += 3
      reasons.push("The manageable weight should help absorb impact without becoming too demanding.")
    }

    if (racket.swingweight <= 310) {
      score += 4
      reasons.push("The very low swingweight should make the racket easy to accelerate and less tiring to use.")
    } else if (racket.swingweight <= 324) {
      score += 1
      reasons.push("The manageable swingweight should make the racket easier to use over longer sessions.")
    }

    if (racket.stringPattern === "16x19") {
      score += 1
      reasons.push("The open string pattern may feel more forgiving than a dense pattern.")
    }
  }

  if (answers.mainNeed === "Maneuverability") {
    if (racket.weight <= 305) {
      score += 2
      reasons.push("The manageable weight should make the racket easier to swing quickly.")
    }

    if (racket.swingweight <= 322) {
      score += 2
      reasons.push("The lower swingweight should help with quick reactions and faster acceleration.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints < 0) {
      score += 2
      reasons.push("The head-light balance should make the racket feel quicker in your hand.")
    }
  }

  if (answers.mainNeed === "Stability") {
    if (racket.weight >= 305) {
      score += 2
      reasons.push("The heavier static weight should help the racket feel more solid at contact.")
    }

    if (racket.swingweight >= 325) {
      score += 2
      reasons.push("The higher swingweight should help the racket resist twisting and push through the ball.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints >= 0) {
      score += 1
      reasons.push("The less head-light balance should add more mass behind the ball.")
    }
  }

  return score
}

function scoreRacketHeadSpeed(racket, answers, reasons) {
  let score = 0

  if (answers.strugglesWithRacketHeadSpeed === "Yes") {
    if (racket.weight <= 305) {
      score += 2
      reasons.push("Because you want easier racket head speed, the manageable weight should be easier to accelerate.")
    }

    if (racket.swingweight <= 322) {
      score += 2
      reasons.push("The lower swingweight should help you swing faster without fighting the frame.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints < 0) {
      score += 1
      reasons.push("The head-light balance should make the racket feel quicker through the swing.")
    }
  }

  if (answers.strugglesWithRacketHeadSpeed === "Not Sure") {
    if (racket.weight <= 305) {
      score += 1
      reasons.push("Since swing speed is uncertain, the manageable weight makes this a safer fit.")
    }
  }

  return score
}

function scoreArmComfort(racket, answers, reasons) {
  let score = 0

  if (answers.armComfortPriority === "Yes") {
    if (racket.stiffness <= 60) {
      score += 3
      reasons.push("Because comfort is a priority, the very soft flex should be easier on the arm.")
    } else if (racket.stiffness <= 65) {
      score += 1
      reasons.push("Because comfort is a priority, the softer flex should be easier on the arm.")
    }

    if (racket.headSize >= 100) {
      score += 1
      reasons.push("The larger head size should make contact more forgiving.")
    }

    if (racket.weight >= 295 && racket.weight <= 310) {
      score += 1
      reasons.push("The moderate weight should help absorb shock without becoming too demanding.")
    }
  }

  if (answers.armComfortPriority === "Somewhat") {
    if (racket.stiffness <= 65) {
      score += 1
      reasons.push("The softer flex gives this racket some added comfort.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints < 0) {
      score += 1
      reasons.push("The head-light balance should help it feel easier to swing.")
    }
  }

  return score
}

function scoreDesiredStyle(racket, answers, reasons) {
  let score = 0

  if (answers.desiredStyle === "Aggressive Baseliner") {
    if (racket.stringPattern === "16x19") {
      score += 1
      reasons.push("For an aggressive baseliner, the open pattern should help create heavier topspin.")
    }

    if (racket.swingweight >= 320) {
      score += 1
      reasons.push("The solid swingweight should help you drive through groundstrokes from the baseline.")
    }
  }

  if (answers.desiredStyle === "All-Court Player") {
    if (racket.weight <= 315 && racket.weight >= 295) {
      score += 1
      reasons.push("The moderate weight should work well for an all-court style.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints < 0) {
      score += 1
      reasons.push("The head-light balance should help with quick transitions and net play.")
    }
  }

  if (
    answers.desiredStyle === "Serve-and-Volley" ||
    answers.desiredStyle === "Doubles Player"
  ) {
    if (hasBalancePoints(racket) && racket.balancePoints < 0) {
      score += 1
      reasons.push("The head-light balance should help with quick volleys and fast exchanges.")
    }

    if (racket.weight <= 310) {
      score += 1
      reasons.push("The manageable weight should help with quick reactions around the net.")
    }
  }

  if (answers.desiredStyle === "Counterpuncher") {
    if (racket.headSize >= 100) {
      score += 1
      reasons.push("The larger head size should give you more forgiveness when defending or redirecting pace.")
    }

    if (racket.weight <= 305) {
      score += 1
      reasons.push("The manageable weight should help you recover quickly between shots.")
    }
  }

  return score
}

function getBestFor(racket) {
  const bestFor = []

  // Head size
  if (racket.headSize <= 97) {
    bestFor.push("High precision")
  } else if (racket.headSize <= 98) {
    bestFor.push("Control")
  } else if (racket.headSize >= 105) {
    bestFor.push("Maximum forgiveness")
  } else if (racket.headSize >= 100) {
    bestFor.push("Forgiveness")
  }

  // Weight
  if (racket.weight >= 320) {
    bestFor.push("Heavy stability")
  } else if (racket.weight >= 305) {
    bestFor.push("Stable feel")
  } else if (racket.weight <= 285) {
    bestFor.push("Very lightweight")
  } else if (racket.weight <= 300) {
    bestFor.push("Easy swing speed")
  }

  // Swingweight
  if (racket.swingweight >= 330) {
    bestFor.push("Big plow-through")
  } else if (racket.swingweight >= 325) {
    bestFor.push("Strong baseline depth")
  } else if (racket.swingweight <= 315) {
    bestFor.push("Very maneuverable")
  } else if (racket.swingweight <= 322) {
    bestFor.push("Quick acceleration")
  }

  // Balance
  if (racket.balancePoints >= 5) {
    bestFor.push("Head-heavy power")
  } else if (racket.balancePoints > 0) {
    bestFor.push("Easy depth")
  } else if (racket.balancePoints <= -8) {
    bestFor.push("Very head-light")
  } else if (racket.balancePoints < 0) {
    bestFor.push("Head-light handling")
  } else if (racket.balancePoints === 0) {
    bestFor.push("Even balance")
  }

  // Stiffness
  if (racket.stiffness >= 70) {
    bestFor.push("Crisp power")
  } else if (racket.stiffness >= 67) {
    bestFor.push("Firm response")
  } else if (racket.stiffness <= 60) {
    bestFor.push("Very soft feel")
  } else if (racket.stiffness <= 64) {
    bestFor.push("Arm-friendly feel")
  }

  // Beam width
  if (racket.beamWidth) {
    if (racket.beamWidth.includes("26") || racket.beamWidth.includes("27")) {
      bestFor.push("Power beam")
    }

    if (racket.beamWidth.includes("20") || racket.beamWidth.includes("21")) {
      bestFor.push("Classic feel")
    }
  }

  // String pattern
  if (racket.stringPattern === "16x19") {
    bestFor.push("Spin access")
  } else if (racket.stringPattern === "18x20") {
    bestFor.push("Tighter control")
  } else if (racket.stringPattern === "18x19") {
    bestFor.push("Controlled spin")
  } else if (racket.stringPattern === "16x20") {
    bestFor.push("Balanced string bed")
  }

  const uniqueBestFor = [...new Set(bestFor)]

  if (uniqueBestFor.length === 0) {
    return "General fit"
  }

  return uniqueBestFor.join(", ")
}

function getTradeoffs(racket, answers) {
  const tradeoffs = []

  // General spec-based tradeoffs
  if (racket.headSize <= 98) {
    tradeoffs.push("The smaller head size may be less forgiving on off-center contact.")
  }

  if (racket.headSize >= 105) {
    tradeoffs.push("The oversized head may feel less precise for players who want maximum control.")
  }

  if (racket.weight >= 315) {
    tradeoffs.push("The heavier static weight may feel demanding during long matches.")
  }

  if (racket.weight <= 285) {
    tradeoffs.push("The lighter weight may feel less stable against heavy pace.")
  }

  if (racket.swingweight >= 328) {
    tradeoffs.push("The higher swingweight may be harder to accelerate quickly.")
  }

  if (racket.swingweight <= 315) {
    tradeoffs.push("The lower swingweight may reduce plow-through on harder shots.")
  }

  if (hasBalancePoints(racket) && racket.balancePoints > 0) {
    tradeoffs.push("The head-heavy balance may feel slower during quick reactions or net play.")
  }

  if (hasBalancePoints(racket) && racket.balancePoints <= -8) {
    tradeoffs.push("The very head-light balance may feel fast, but it may not give as much natural depth.")
  }

  if (racket.stiffness >= 68) {
    tradeoffs.push("The firmer frame may feel less comfortable, especially with stiffer strings.")
  }

  if (racket.stiffness <= 60) {
    tradeoffs.push("The softer flex may offer less free power than a firmer frame.")
  }

  if (racket.stringPattern === "18x20") {
    tradeoffs.push("The denser string pattern may make spin a little harder to access.")
  }

  if (racket.stringPattern === "16x19") {
    tradeoffs.push("The open string pattern may launch the ball higher than a tighter control pattern.")
  }

  // Answer-specific tradeoffs
  if (answers.mainNeed === "Power") {
    if (racket.headSize <= 98) {
      tradeoffs.push("Since you want more power, the smaller head size may require cleaner contact.")
    }

    if (racket.stiffness <= 64) {
      tradeoffs.push("Since you want more power, the softer flex may not give as much easy pace.")
    }

    if (racket.swingweight <= 318) {
      tradeoffs.push("Since you want more power, the lower swingweight may not drive through the ball as easily.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints <= -8) {
      tradeoffs.push("Since you want more power, the very head-light balance may require more effort to create depth.")
    }
  }

  if (answers.mainNeed === "Control") {
    if (racket.headSize >= 100) {
      tradeoffs.push("Since you want more control, the larger head size may feel slightly less precise.")
    }

    if (racket.stiffness >= 67) {
      tradeoffs.push("Since you want more control, the firmer response may feel a little less connected.")
    }

    if (racket.stringPattern === "16x19") {
      tradeoffs.push("Since you want more control, the open pattern may launch higher than a denser pattern.")
    }

    if (racket.weight <= 295) {
      tradeoffs.push("Since you want more control, the lighter weight may feel less stable through contact.")
    }
  }

  if (answers.mainNeed === "Spin") {
    if (racket.stringPattern === "18x20") {
      tradeoffs.push("Since you want more spin, the denser string pattern may make spin harder to generate.")
    }

    if (racket.headSize <= 98) {
      tradeoffs.push("Since you want more spin, the smaller head size gives you a smaller spin window.")
    }

    if (racket.weight >= 315) {
      tradeoffs.push("Since you want more spin, the heavier weight may make fast brushing swings harder.")
    }

    if (racket.swingweight >= 328) {
      tradeoffs.push("Since you want more spin, the higher swingweight may be harder to whip through contact.")
    }
  }

  if (answers.mainNeed === "Comfort") {
    if (racket.stiffness >= 66) {
      tradeoffs.push("Since comfort matters, the firmer flex may feel harsher on mishits.")
    }

    if (racket.weight <= 290) {
      tradeoffs.push("Since comfort matters, the lighter weight may absorb less shock at contact.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints > 0) {
      tradeoffs.push("Since comfort matters, the head-heavy balance may feel more tiring over time.")
    }

    if (racket.swingweight >= 328) {
      tradeoffs.push("Since comfort matters, the higher swingweight may feel more demanding over long sessions.")
    }
  }

  if (answers.mainNeed === "Maneuverability") {
    if (racket.weight >= 305) {
      tradeoffs.push("Since you want maneuverability, the heavier weight may feel harder to move quickly.")
    }

    if (racket.swingweight >= 323) {
      tradeoffs.push("Since you want maneuverability, the higher swingweight may feel slower on quick exchanges.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints >= 0) {
      tradeoffs.push("Since you want maneuverability, the less head-light balance may feel slower in hand.")
    }

    if (racket.headSize >= 105) {
      tradeoffs.push("Since you want maneuverability, the oversized head may feel slightly bulkier through the swing.")
    }
  }

  if (answers.mainNeed === "Stability") {
    if (racket.weight <= 300) {
      tradeoffs.push("Since you want stability, the lighter weight may not feel as solid against heavy pace.")
    }

    if (racket.swingweight <= 320) {
      tradeoffs.push("Since you want stability, the lower swingweight may not give as much plow-through.")
    }

    if (racket.headSize <= 98) {
      tradeoffs.push("Since you want stability, the smaller head size may be less forgiving when contact is off-center.")
    }
  }

  if (answers.strugglesWithRacketHeadSpeed === "Yes") {
    if (racket.weight >= 305) {
      tradeoffs.push("Because racket head speed is a concern, the weight may take more effort to accelerate.")
    }

    if (racket.swingweight >= 323) {
      tradeoffs.push("Because racket head speed is a concern, the swingweight may feel demanding.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints > 0) {
      tradeoffs.push("Because racket head speed is a concern, the head-heavy balance may feel slower.")
    }
  }

  if (answers.armComfortPriority === "Yes") {
    if (racket.stiffness >= 66) {
      tradeoffs.push("Because arm comfort is a priority, the firmer feel may be something to watch.")
    }

    if (racket.weight <= 290) {
      tradeoffs.push("Because arm comfort is a priority, the lighter frame may feel less shock-absorbing.")
    }

    if (racket.stringPattern === "18x20") {
      tradeoffs.push("Because arm comfort is a priority, the denser pattern may feel less forgiving with stiff strings.")
    }
  }

  if (answers.desiredStyle === "Aggressive Baseliner") {
    if (racket.swingweight <= 318) {
      tradeoffs.push("For aggressive baseline play, the lower swingweight may not give as much weight behind the ball.")
    }

    if (racket.weight <= 295) {
      tradeoffs.push("For aggressive baseline play, the lighter frame may feel less stable against pace.")
    }
  }

  if (answers.desiredStyle === "All-Court Player") {
    if (racket.swingweight >= 330) {
      tradeoffs.push("For all-court play, the higher swingweight may feel slower during quick transitions.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints > 0) {
      tradeoffs.push("For all-court play, the head-heavy balance may feel less quick at net.")
    }
  }

  if (
    answers.desiredStyle === "Serve-and-Volley" ||
    answers.desiredStyle === "Doubles Player"
  ) {
    if (racket.swingweight >= 325) {
      tradeoffs.push("For net play, the higher swingweight may feel slower on quick volleys.")
    }

    if (hasBalancePoints(racket) && racket.balancePoints > 0) {
      tradeoffs.push("For net play, the head-heavy balance may make quick exchanges harder.")
    }

    if (racket.weight >= 315) {
      tradeoffs.push("For net play, the heavier weight may feel demanding during fast reactions.")
    }
  }

  if (answers.desiredStyle === "Counterpuncher") {
    if (racket.weight >= 315) {
      tradeoffs.push("For counterpunching, the heavier weight may make recovery swings harder.")
    }

    if (racket.swingweight >= 328) {
      tradeoffs.push("For counterpunching, the higher swingweight may slow down defensive reactions.")
    }

    if (racket.headSize <= 98) {
      tradeoffs.push("For counterpunching, the smaller head size may offer less forgiveness when defending.")
    }
  }

  const uniqueTradeoffs = [...new Set(tradeoffs)]

  if (uniqueTradeoffs.length === 0) {
    return ["No major tradeoffs based on your answers, but you should still demo it if possible."]
  }

  return uniqueTradeoffs
}

function scoreProfileBonus(racket, answers, reasons) {
  let score = 0

  const isComfortFrame =
    racket.stiffness <= 60 &&
    racket.headSize >= 100 &&
    racket.swingweight <= 315 &&
    racket.weight >= 285 &&
    racket.weight <= 305

  const isSpinFrame =
    racket.stringPattern === "16x19" &&
    racket.headSize >= 100 &&
    racket.weight >= 285 &&
    racket.weight <= 305 &&
    racket.swingweight >= 315 &&
    racket.swingweight <= 330

  const isControlFrame =
    racket.headSize <= 98 &&
    racket.weight >= 300 &&
    racket.swingweight >= 318 &&
    racket.stringPattern !== "16x18"

  const isPowerFrame =
    racket.headSize >= 100 &&
    racket.stiffness >= 66 &&
    racket.swingweight >= 318 &&
    racket.beamWidth &&
    (
      racket.beamWidth.includes("24") ||
      racket.beamWidth.includes("25") ||
      racket.beamWidth.includes("26")
    )

  const isManeuverableFrame =
    racket.weight <= 300 &&
    racket.swingweight <= 318 &&
    hasBalancePoints(racket) &&
    racket.balancePoints < 0

  const isStableFrame =
    racket.weight >= 305 &&
    racket.swingweight >= 325

  if (answers.mainNeed === "Comfort" && isComfortFrame) {
    score += 8
    reasons.push(
      "This racket has a true comfort-focused profile: very soft flex, forgiving head size, low swingweight, and manageable weight."
    )
  }

  if (answers.mainNeed === "Spin" && racket.playStyle === "Spin") {
    score += 3
    reasons.push(
      "This racket is listed as a spin-focused frame, which matches your main priority."
    )
  }

  if (answers.mainNeed === "Spin" && isSpinFrame) {
    score += 5
    reasons.push(
      "This racket has a strong spin-friendly profile: open string pattern, forgiving head size, and manageable swingweight."
    )
  }

  if (answers.mainNeed === "Control" && isControlFrame) {
    score += 5
    reasons.push(
      "This racket has a control-focused profile: smaller head size, solid weight, and a more precise response."
    )
  }

  if (answers.mainNeed === "Power" && isPowerFrame) {
    score += 5
    reasons.push(
      "This racket has a power-friendly profile: forgiving head size, firmer response, and a beam built for easier depth."
    )
  }

  if (answers.mainNeed === "Maneuverability" && isManeuverableFrame) {
    score += 5
    reasons.push(
      "This racket has a maneuverability-focused profile: lighter weight, low swingweight, and head-light handling."
    )
  }

  if (answers.mainNeed === "Stability" && isStableFrame) {
    score += 5
    reasons.push(
      "This racket has a stability-focused profile: heavier static weight and higher swingweight for a more solid feel."
    )
  }

  return score
}

function scoreRacket(racket, answers) {
  let score = 0
  const reasons = []

  score += scoreMainNeed(racket, answers, reasons)
  score += scoreRacketHeadSpeed(racket, answers, reasons)
  score += scoreArmComfort(racket, answers, reasons)
  score += scoreDesiredStyle(racket, answers, reasons)
  score += scoreProfileBonus(racket, answers, reasons)

  if (answers.mainNeed === "Comfort") {
    if (racket.stringPattern === "18x20") {
      score -= 2
    }

    if (racket.headSize <= 98) {
      score -= 2
    }

    if (racket.swingweight >= 326) {
      score -= 2
    }

    if (racket.weight >= 315) {
      score -= 1
    }

    if (racket.stiffness >= 67) {
      score -= 3
    }
  }

  if (answers.mainNeed === "Maneuverability") {
    if (racket.weight >= 310) {
      score -= 1
    }

    if (racket.swingweight >= 325) {
      score -= 1
    }
  }

  if (answers.mainNeed === "Spin") {
    if (racket.stringPattern === "18x20") {
      score -= 2
    }
  }

  if (answers.strugglesWithRacketHeadSpeed === "Yes") {
    if (racket.weight >= 310) {
      score -= 1
    }

    if (racket.swingweight >= 325) {
      score -= 1
    }
  }

  if (answers.armComfortPriority === "Yes") {
    if (racket.stiffness >= 67) {
      score -= 2
    }

    if (racket.swingweight >= 330) {
      score -= 1
    }
  }

  const uniqueReasons = [...new Set(reasons)]

  return {
    ...racket,
    score,
    reasons: uniqueReasons,
    bestFor: getBestFor(racket),
    tradeoffs: getTradeoffs(racket, answers),
  }
}

router.post("/", async (req, res) => {
  try {
    const answers = req.body

    const result = await pool.query("SELECT * FROM rackets")

    const rackets = result.rows.map(formatRacket)

    const recommendations = rackets
      .map((racket) => scoreRacket(racket, answers))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    res.json(recommendations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router