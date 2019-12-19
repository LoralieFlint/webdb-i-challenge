const express = require("express");
const db = require("./data/dbConfig");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h1>Lambda webdb-i-challenge!</h1>
  `);
});

server.get("/budget", async (req, res, next) => {
  try {
    res.json(await db("accounts").select('budget'));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

server.get("/budget/:id", async (req, res, next) => {
    try {
        res.json(await db("accounts").where("id", req.params.id).first("budget"))
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



module.exports = server;
