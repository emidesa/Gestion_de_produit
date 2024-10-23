const mysql = require('mysql2');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'star_wars'
});

connexion.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

module.exports = connexion;