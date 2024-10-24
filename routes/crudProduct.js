const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/allProduct', (req,res) => {
    const selectAllProduct = "SELECT produit.id_produit, produit.libelle as libelle_produit, produit.prix, produit.description, produit.image, categorie.libelle as libelle_categorie FROM produit INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie;";
    db.query(selectAllProduct, (erreur, result) => {
        if (erreur) throw error;
        res.render('homePage', {crudProduct: result});

    });
});

router.get('/getProduct/:id', (req, res) => {
    const selectProduct = 'SELECT * FROM produit WHERE id_produit = ?;';
    db.query(selectProduct,[req.params.id], (error, result) => {
         if(error) throw error;
         res.render('updatePage', {updateProduct: result[0]});
    });
});

router.post('/update/:id', (req, res) => {
    const {prix, image, id} = req.body;
    const updateProduct  = "UPDATE produit SET prix = ?, image = ? WHERE id_produit = ?;";
    db.query(updateProduct, [prix, image, id], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');
    })
})

router.get('/deleteProduct/:id', (req, res) => {
    const deleteProduct = 'DELETE FROM produit WHERE id_produit = ?;';
    db.query(deleteProduct,[req.params.id], (error, result) => {
         if(error) throw error;
         res.redirect('/product/allProduct');
    });
});

module.exports = router;