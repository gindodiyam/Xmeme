const express = require("express");
const app = express();
const meme = require("./routes/memes");
var cors = require("cors");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/xmemeDB"; //Database location

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:8081/");
  next();
});

//Connecting to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

app.use(express.json()); //body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/memes", meme);
app.use("/", meme);

//Get requests
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
