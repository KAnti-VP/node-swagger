import express from "express";
import db from "../data/db.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?;")
      .get(+req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "A name és az email megadása kötelező.",
      });
    }

    const result = db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run(name, email);

    res.status(201).json({
      id: Number(result.lastInsertRowid),
      name,
      email,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?;")
      .get(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?;").run(
      req.body.name || user.name,
      req.body.email || user.email,
      req.params.id,
    );
    res.status(200).json({
      id: req.params.id,
      name: req.body.name || user.name,
      email: req.body.email || user.email,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const user = db
      .prepare("SELECT * FROM users WHERE id = ?;")
      .get(+req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    db.prepare("DELETE FROM users WHERE id = ?;").run(+req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
