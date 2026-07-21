const express = require("express");
const cors = require("cors");
const racketRoutes = require("./routes/rackets")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tennis Racket Finder API is running")
})

app.use("/rackets", racketRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});