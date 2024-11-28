import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await dbQuery("SELECT * FROM users;");
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await dbRun("INSERT INTO users (name, email) VALUES (?, ?);", [req.body.name, req.body.email]);
        res.status(201).json({ id: result.lastID, ...req.body });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "User not found" });

        await dbRun("UPDATE users SET name = ?, email = ? WHERE id = ?;", [req.body.name || user.name, req.body.email || user.email, req.params.id]);
        res.status(200).json({ id: req.params.id, name: req.body.name || user.name, email: req.body.email || user.email });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "User not found" });

        await dbRun("DELETE FROM users WHERE id = ?;", [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;
