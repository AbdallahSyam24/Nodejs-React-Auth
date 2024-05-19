const express = require("express");
const { createToken, auth, pool, apiKey } = require("./utils");
const bcrypt = require("bcrypt");
const cors = require("cors");
const axios = require('axios');

const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const user = req.body;
  pool.query("select * from users where email=? LIMIT 1", [user.email], (e, results) => {
    if (e) {
      throw e;
    }
    if (results.length > 0) {
      res.send({ success: false, error: "This email was already used" });
      return null;
    }
    const newUser = {
      id: uuidv4(),
      email: user.email,
      password: bcrypt.hashSync(user.password, 10)
    }
    pool.query("INSERT INTO `users` SET ?", newUser, (e, results2) => {
      if (e) {
        throw e;
      }
      res.send({ succes: true });
    });
  });
  return null;
});

app.post("/login", (req, res) => {
  const user = req.body;
  pool.query("select * from users where email=? LIMIT 1", [user.email], (err, results) => {
    if (err) {
      throw err;
    }
    if (results.length > 0) {
      let found = results[0];
      if (!bcrypt.compareSync(user.password, found.password)) {
        res.send({ success: false, error: "Wrong password" });
        return null;
      }
      const token = createToken(found);
      res.send({ success: true, data: token });
    } else {
      res.send({ success: false, error: "Wrong email" });
      return null;
    }
  });
  return null;
});

app.use(auth);

app.get("/products", (req, res) => {
  pool.query("select * from products where deleted = 0 order by name", (e, results) => {
    if (e) {
      throw e;
    }
    res.send({ success: true, data: results });
  });
  return null;
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  pool.query("select * from products where id=? and deleted = 0", [id], (e, results) => {
    if (e) {
      throw e;
    }
    res.send({ success: true, data: results });
  });
  return null;
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
    origin: req.body.origin,
    instock: req.body.instock,
  }
  pool.query("insert into products set?", newProduct, (e, results) => {
    if (e) {
      throw e;
    }
    res.send({ success: true, data: results });
  })
  return null;
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    price: req.body.price,
    origin: req.body.origin,
    instock: req.body.instock,
  }
  pool.query("update products set? where id=?", [updateData, id], (e, results) => {
    if (e) {
      throw e;
    }
    res.send({ success: true, data: results });
  });
  return null;
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM `products` WHERE id=?", [id], (e, results) => {
    if (e) {
      throw e;
    }
    res.send({ success: true, data: results });
  });
});

app.use((req, res, next) => {
  res.send("API is not supported");
});

let PORT = 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
