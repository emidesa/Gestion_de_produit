const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/addUser', async (req, res) => {
    const {prenom, email, password } = req.body;

    const securedPassword = await bcrypt.hash(password, 10);
   
    const insertUser = "INSERT INTO user (prenom, email, password) VALUES (?, ?, ?);";
    db.query(insertUser, [prenom, email, securedPassword], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');
    });
});

router.get('/signInForm', (req, res) => {
    res.render('signInPage');
});

router.get('/loginForm', (req, res) => {
    res.render('loginPage');
});

router.post('/loginUser', (req,res) => {
    const {email, password } = req.body;
    const loginUser = "SELECT email, password FROM user WHERE email LIKE ?;";
    db.query(loginUser, [email], async (error, result) => {
       console.log(result); 
        
        const decrypt = await bcrypt.compare(password,result[0].password)
console.log(decrypt);
        if(decrypt === true) {
            res.redirect('/product/allProduct');
        } else {
            res.redirect('/user/loginForm');
        }
    });
});
module.exports = router;