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
    stringPattern: "16x19",
    stiffness: 68,
    swingweight: 335,
    playStyle: "control",
  },
  {
    id: 2,
    brand: "Babolat",
    model: "Pure Aero 100",
    headSize: 100,
    weight: 300,
    stringPattern: "16x19",
    stiffness: 69,
    swingweight: 322,
    playStyle: "spin",
  },
  {
    id: 3,
    brand: "Yonex",
    model: "VCORE 100",
    headSize: 100,
    weight: 300,
    stringPattern: "16x19",
    stiffness: 67,
    swingweight: 320,
    playStyle: "spin",
  },
];

app.get("/", (req, res) => {
  res.send("Tennis Racket Finder API is running");
});

app.get("/rackets", (req, res) => {
  const { brand, stringPattern, search } = req.query

  let filterRackets = rackets

  if (brand) {
    filterRackets = filterRackets.filter((racket) => racket.brand === brand)
  }

  if (stringPattern) {
    filterRackets = filterRackets.filter((racket) => racket.stringPattern === stringPattern)
  }

  if (search) {
    filteredRackets = filteredRackets.filter((racket) =>
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
  const { brand, model, headSize, weight, stringPattern } = req.body

  if (!brand || !model || !headSize || !weight || !stringPattern) {
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