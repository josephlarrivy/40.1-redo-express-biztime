const express = require("express");
const router = new express.Router();
const db = require("../db");


router.get("/", (req, res, next) => {
    return res.send('test invoices')
})



















module.exports = router;