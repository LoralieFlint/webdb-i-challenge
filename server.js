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
    res.json(await db("accounts").select());
  } catch (error) {
    console.log(error);
    next(error);
  }
});

server.get("/budget/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first("budget")
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

server.post("/new", async (req, res, next) => {
  const payload = {
    name: req.body.name,
    budget: req.body.budget
  };
  try {
    const id = await db("accounts").insert(payload);
    res.json({
        message: `Posted ${id}`
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

server.put("/:id", async (req, res, next) => {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    try {
      await db("accounts").where("id", req.params.id).update(payload);
      res.json(await db("accounts").where("id", req.params.id));
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  server.delete("/:id", async (req, res, next) => {
    try {
      await db("accounts").where("id", req.params.id).del();
      res.status(204).end()
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



module.exports = server;
