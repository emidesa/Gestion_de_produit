const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/allProduct', (req,res) => {
    const selectAllProduct = "SELECT produit.libelle as libelle_produit, produit.prix, produit.description, produit.image, categorie.libelle as libelle_categorie FROM produit INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie;";
    db.query(selectAllProduct, (erreur, result) => {
        if (erreur) throw error;
        res.render('homePage', {crudProduct: result});

    });
});



module.exports = router;