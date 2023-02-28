let express = require("express");
let app = express();

const { simpLogger } = require("./simpLogger.js");
app.use(simpLogger);

require("dotenv").config();

const isUpcase = process.env.MESSAGE_STYLE;
console.log(isUpcase);

const filepath = `${__dirname}/views/index.html`;
const statFiles = express.static(`${__dirname}/public`);

app.use("/public", statFiles);

app.get("/", (req, res) => {
  res.status(200).sendFile(filepath);
});

let message = "Hello json";
if (isUpcase === "uppercase") {
  message = message.toUpperCase();
}

app.get("/json", (req, res) => {
  res.status(200).json({ message: message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

module.exports = app;
