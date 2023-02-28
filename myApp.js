let express = require("express");
let app = express();

const bodyParser = require("body-parser");
const handleEncoded = bodyParser.urlencoded({ extended: false });
app.use("/name", handleEncoded);

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
  res.status(200).send({ message: message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toLocaleTimeString("en-US", { timeZone: "Africa/Nairobi" });
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.route("/name").get((req, res) => {
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
