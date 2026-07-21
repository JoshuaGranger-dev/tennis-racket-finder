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
    balance: row.balance,
    stiffness: row.stiffness,
    beamWidth: row.beam_width,
    stringPattern: row.string_pattern,
    playStyle: row.play_style,
  }
}

router.get("/", async (req, res) => {
  try {
    const { brand, stringPattern, playStyle, headSize, search } = req.query

    let query = "SELECT * FROM rackets WHERE 1=1"
    const values = []

    if (brand) {
      values.push(brand)
      query += ` AND brand = $${values.length}`
    }

    if (stringPattern) {
      values.push(stringPattern)
      query += ` AND string_pattern = $${values.length}`
    }

    if (playStyle) {
      values.push(playStyle)
      query += ` AND play_style = $${values.length}`
    }

    if (headSize) {
      values.push(Number(headSize))
      query += ` AND head_size = $${values.length}`
    }

    if (search) {
      values.push(`%${search}%`)
      query += ` AND (brand ILIKE $${values.length} OR model ILIKE $${values.length})`
    }

    const result = await pool.query(query, values)

    const rackets = result.rows.map(formatRacket)

    res.json(rackets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const racketId = Number(req.params.id)

    const result = await pool.query(
      "SELECT * FROM rackets WHERE id = $1",
      [racketId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Racket not found" })
    }

    const racket = formatRacket(result.rows[0])

    res.json(racket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const {
      brand,
      model,
      headSize,
      weight,
      stringPattern,
      swingweight,
      balance,
      stiffness,
      beamWidth,
      playStyle,
    } = req.body

    if (
      !brand ||
      !model ||
      !headSize ||
      !weight ||
      !stringPattern
    ) {
      return res.status(400).json({ error: "Missing required racket fields" })
    }

    const result = await pool.query(
      `INSERT INTO rackets
        (
          brand,
          model,
          head_size,
          weight,
          string_pattern,
          swingweight,
          balance,
          stiffness,
          beam_width,
          play_style
        )
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        brand,
        model,
        Number(headSize),
        Number(weight),
        stringPattern,
        swingweight ? Number(swingweight) : null,
        balance || null,
        stiffness ? Number(stiffness) : null,
        beamWidth || null,
        playStyle || null,
      ]
    )

    const racket = formatRacket(result.rows[0])

    res.status(201).json(racket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const racketId = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM rackets WHERE id = $1 RETURNING *",
      [racketId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Racket not found"})
    }

    res.json({ message: "Racket deleted successfully"})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server error"})
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const racketId = Number(req.params.id)
    const updates = req.body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "At least one field is required to update" })
    }

    const allowedFields = {
      brand: "brand",
      model: "model",
      headSize: "head_size",
      weight: "weight",
      stringPattern: "string_pattern",
      swingweight: "swingweight",
      balance: "balance",
      stiffness: "stiffness",
      beamWidth: "beam_width",
      playStyle: "play_style",
    }

    const setClauses = []
    const values = []

    for (const key in updates) {
      if (allowedFields[key]) {
        values.push(updates[key])
        setClauses.push(`${allowedFields[key]} = $${values.length}`)
      }
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ error: "No valid fields provided" })
    }

    values.push(racketId)

    const query = `
      UPDATE rackets
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Racket not found" })
    }

    const updatedRacket = formatRacket(result.rows[0])

    res.json(updatedRacket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router