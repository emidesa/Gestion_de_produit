const express = require('express');
const app = express();
const path = require('path');
const crudProduct = require('./routes/crudProduct');
const bodyParser = require('body-parser');
const ejs = require('ejs');



app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'pages')));
app.set('view engine', 'ejs');
app.set('pages', path.join(__dirname, 'pages'));


app.use('/product', crudProduct);



app.listen(3000, () => {
    console.log ('listening on port 3000');
})