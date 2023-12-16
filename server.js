const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const timeRouter = require("./routes/times");

app.use("/", timeRouter);

app.listen(3000);
