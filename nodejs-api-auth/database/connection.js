const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'full-stack-practice',
    port: 3306,
    user: 'admin',
    password: '',
});

connection.connect;
module.exports = connection;