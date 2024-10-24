const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/addUser', (req, res) => {
    const {prenom, email, password } = req.body;

    const securedPassword = bcrypt.hash(password, 10);
   
    const insertUser = "INSERT INTO user (prenom, email, password) VALUES (?, ?, ?);";
    db.query(insertUser, [prenom, email, securedPassword], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');
    });
})

module.exports = router;