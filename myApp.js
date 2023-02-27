let express = require("express");
let app = express();

const filepath = `${__dirname}/views/index.html`;

app.get("/", (req, res) => {
  res.status(200).sendFile(filepath);
});

module.exports = app;
