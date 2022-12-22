const express = require("express");
const router = new express.Router();
const db = require("../db");


router.get("/", async (req, res, next) => {
    try {
        let result = await db.query(`SELECT * FROM companies`)
        return res.json({ companies: result.rows })
    } catch (e) {
        next(e)
    }
})

router.get("/:code", async (req, res, next) => {
    try {
        let code = req.params.code;
        let result = await db.query('SELECT * FROM companies WHERE code = $1', [code])
        return res.json({ companies: result.rows })
    } catch (e) {
        next(e)
    }
})

router.post("/", async (req, res, next) => {
    try {
        let { code, name, description } = req.body;
        let result = await db.query(
            'INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description])
        return res.status(200).json(result.rows)
    } catch (e) {
        next(e)
    }
})

router.put("/:code", async (req, res, next) => {
    let code = req.params.code;
    try {
        let { name, description } = req.body;
        let result = await db.query(
            'UPDATE companies SET name = $2, description = $3 WHERE code = $1 RETURNING code, name, description', [code, name, description])
        return res.status(200).json(result.rows[0])
    } catch (e) {
        next(e)
    }
})

router.delete("/:code", async (req, res, next) => {
    let code = req.params.code;
    try {
        // let { name, description } = req.body;
        let result = await db.query(
            'DELETE FROM companies WHERE code = $1', [code]);
        return res.json({ message: "Deleted" })
    } catch (e) {
        next(e)
    }
})











module.exports = router;