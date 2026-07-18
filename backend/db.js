const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tennis-racket-finder",
  password: "@Lsujag359",
  port: 5432,
})

module.exports = pool