const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/query", (req, res) => {
  const query = req.query.query || "default";
  res.json({ query });
});

// Ekspor aplikasi Express
module.exports = app;
