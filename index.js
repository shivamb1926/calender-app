const express = require("express");
const cors = require("cors");

const db = require("./db");
const apiRouter = require("./routes/api-router");

const app = express();

const apiPort = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", apiRouter);

app.listen(apiPort, () => {
	console.log("server running on 4000");
});
