const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const rackets = [
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
    filterRackets = rackets.filter((racket) => racket.brand === brand)
  }

  if (stringPattern) {
    filterRackets = rackets.filter((racket) => racket.stringPattern === stringPattern)
  }

  if (search) {
    filterRackets = rackets.filter((
      racket) => 
        racket.model.toLowerCase().includes(search.toLowerCase()) ||
        racket.brand.toLowerCase().includes(search.toLowerCase())
    )
  }

  res.json(filterRackets);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});