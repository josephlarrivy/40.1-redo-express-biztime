const express = require("express");
const router = new express.Router();
const db = require("../db");


router.get("/", async (req, res, next) => {
    try {
        let result = await db.query('SELECT * FROM industries')
        return res.json(result.rows)
    } catch (e) {
        next(e)
    }
})

router.post("/", async (req, res, next) => {
    try {
        let { industry_code, name } = req.body;
        let result = await db.query('INSERT INTO industries (industry_code, name) VALUES ($1, $2)', [industry_code, name])
        return res.json({status: 'industry created'})

    } catch (e) {
        next(e)
    }
})



module.exports = router;
