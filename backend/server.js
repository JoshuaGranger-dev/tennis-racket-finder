const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let rackets = [
  {
    id: 1,
    brand: "Wilson",
    model: "Pro Staff RF97 v13",
    headSize: 97,
    weight: 340,
    swingweight: 335,
    balance: "12 pts HL",
    stiffness: 68,
    beamWidth: "21.5mm",
    stringPattern: "16x19",
    playStyle: "Control",
  },
  {
    id: 2,
    brand: "Babolat",
    model: "Pure Aero 100",
    headSize: 100,
    weight: 300,
    swingweight: 322,
    balance: "4 pts HL",
    stiffness: 69,
    beamWidth: "23/26/23mm",
    stringPattern: "16x19",
    playStyle: "Spin",
  },
  {
    id: 3,
    brand: "Yonex",
    model: "VCORE 100",
    headSize: 100,
    weight: 300,
    swingweight: 320,
    balance: "4 pts HL",
    stiffness: 67,
    beamWidth: "25.3/25.3/22mm",
    stringPattern: "16x19",
    playStyle: "Spin",
  },
];

app.get("/", (req, res) => {
  res.send("Tennis Racket Finder API is running");
});

app.get("/rackets", (req, res) => {
  const { brand, stringPattern, playStyle, headSize, search } = req.query

  let filterRackets = rackets

  if (brand) {
    filterRackets = filterRackets.filter((racket) => racket.brand === brand)
  }

  if (stringPattern) {
    filterRackets = filterRackets.filter((racket) => racket.stringPattern === stringPattern)
  }

  if (playStyle) {
    filterRackets = filterRackets.filter((racket) => racket.playStyle === playStyle)
  }

  if (headSize) {
    filterRackets = filterRackets.filter(
      (racket) => racket.headSize === Number(headSize)
    )
  }

  if (search) {
    filterRackets = filterRackets.filter((racket) =>
      racket.brand.toLowerCase().includes(search.toLowerCase()) ||
      racket.model.toLowerCase().includes(search.toLowerCase())
    )
  }

  res.json(filterRackets);
});

app.get("/rackets/:id", (req, res) => {
  const racketId = Number(req.params.id)

  const racket = rackets.find((racket) => racket.id === racketId)

  if (!racket) {
    return res.status(404).json({ error: "Racket not found" })
  }

  res.json(racket)
})

app.post("/rackets", (req, res) => {
  const { brand,
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

  if (!brand ||
    !model ||
    !headSize ||
    !weight ||
    !stringPattern ||
    !swingweight ||
    !balance ||
    !stiffness ||
    !beamWidth ||
    !playStyle
  ) {
      return res.status(400).json({ error: "Missing required racket fields" })
  }

  const newId = rackets.length > 0
    ? Math.max(...rackets.map((racket) => racket.id)) + 1
    : 1

  const newRacket = {
  id: newId,
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
  }

  rackets.push(newRacket)

  res.status(201).json(newRacket)
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