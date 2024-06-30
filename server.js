const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra").promises;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/query", (req, res) => {
  const query = req.query.query || "default";
  res.json({ query });
});

app.get("/api/messages", async (req, res) => {
  try {
    const fileData = await fs.readFile("public/message.json", "utf8");
    const jsonData = JSON.parse(fileData);
    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error reading data" });
  }
});

app.post("/api/save", async (req, res) => {
  const newData = req.body;

  try {
    let jsonData = [];

    // Check if the file exists
    const fileExists = await fs.access("public/message.json").then(() => true).catch(() => false);

    // If file exists, read existing data from JSON file
    if (fileExists) {
      const fileData = await fs.readFile("public/message.json", "utf8");
      if (fileData) {
        jsonData = JSON.parse(fileData);
      }
    }

    // Append new data to the array
    jsonData.push(newData);

    // Write back to the JSON file
    await fs.writeFile("public/message.json", JSON.stringify(jsonData, null, 2));

    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
