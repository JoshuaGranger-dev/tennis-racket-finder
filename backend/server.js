const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = require("./db")

app.get("/", (req, res) => {
  res.send("Tennis Racket Finder API is running");
});

app.get("/rackets", async (req, res) => {
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

    const rackets = result.rows.map((row) => ({
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
    }))

    res.json(rackets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

app.get("/rackets/:id", async (req, res) => {
  try {
    const racketId = Number(req.params.id)

    const result = await pool.query(
      "SELECT * FROM rackets WHERE id = $1",
      [racketId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Racket not found" })
    }

    const row = result.rows[0]

    const racket = {
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

    res.json(racket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/rackets", async (req, res) => {
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

    const row = result.rows[0]

    const newRacket = {
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

    res.status(201).json(newRacket)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

app.delete("/rackets/:id", (req, res) => {
  const racketId = Number(req.params.id)

  const racketExists = rackets.some((racket) => racket.id === racketId)

  if (!racketExists) {
    return res.status(404).json({ error: "Racket not found" })
  }

  rackets = rackets.filter((racket) => racket.id !== racketId)

  res.json({ message: "Racket deleted successfully" })
})

app.patch("/rackets/:id", (req, res) => {
  const racketId = Number(req.params.id)

  const updates = req.body

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "At least one field is required to update" })
  }

  const racketExists = rackets.find((racket) => racket.id === racketId)

  if (!racketExists) {
    return res.status(404).json({ error: "Racket not found" })
  }

  rackets = rackets.map((racket) => {
    if (racket.id === racketId) {
      return { ...racket, ...updates }
    }

    return racket

  })

  const updatedRacket = rackets.find((racket) => racket.id === racketId)

  res.json(updatedRacket)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});