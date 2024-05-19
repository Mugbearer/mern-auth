const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
}

app.use(logger("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);

module.exports = app;
