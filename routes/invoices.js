const express = require("express");
const router = new express.Router();
const db = require("../db");


router.get("/", async (req, res, next) => {
    try {
        let result = await db.query(`SELECT * FROM invoices`)
        return res.json({ invoices: result.rows })
    } catch (e) {
        next(e)
    }
})

router.get("/:id", async (req, res, next) => {
    let { id } = req.params;
    try {
        let result = await db.query('SELECT * FROM invoices WHERE id = $1', [id])
        return res.json({ invoice: result.rows })
    } catch (e) {
        next(e)
    }
})

router.post("/", (req, res, next) => {
    let { comp_code, amt } = req.body;
    try {
        let result = db.query('INSERT INTO invoices (comp_code, amt, paid, paid_date) VALUES ($1, $2, $3, $4)', [comp_code, amt, false, null])
        return res.json({msg: "created"})
    } catch (e) {
        next(e)
    }
})

router.put("/:id", async (req, res, next) => {
    let id  = req.params.id;
    let { amt } = req.body;
    try {
        let result = db.query('UPDATE invoices SET amt = $2 WHERE id = $1', [id, amt])
        return res.json({msg: "updated"})
    } catch (e) {
        next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = db.query('DELETE FROM invoices WHERE id = $1', [id])
        return res.json({status: "deleted"})
    } catch (e) {
        next(e)
    }
})

router.get("/:code", (req, res, next) => {
    try {
        let code = req.params.code;
        let result = db.query('SELECT * FROM companies WHERE comp_code = $1', [code])
        // return res.send(code)
        return res.json({company: result})
    } catch (e) {
        next(e)
    }
})









module.exports = router;