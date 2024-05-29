const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

console.log(process.env.PASSWORD)
const conn = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

conn.connect((err) => {
    if(err) throw err;
    console.log("Connected to DB")
})

app.use(cors());
app.use(express.static(__dirname + '/static'));

app.get("/todos", async (req, res) => {
  console.log("inside get users");
  conn.query("SELECT * FROM todos.todostable", (err, result) => {
    if(err) {
        res.status(422).json("No data available")
    } else {
        res.status(201).json(result)
    }
  })
});

app.get("/", async (req, res) => {
  res.sendFile("static/index.html", {root: __dirname})
})

app.listen(8000, () => {
  console.log("server listening in port 8000");
});
