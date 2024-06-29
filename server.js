const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');


app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/query", (req, res) => {
  const query = req.query.query || "default";
  res.json({ query });
});
app.use(bodyParser.json());

app.post("/save", (req, res) => {
  const data = req.body;
  fs.writeFile("public/message.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving data" });
    }
    res.json({ message: "Data saved successfully" });
  });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
