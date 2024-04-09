const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'full-stack-store',
    port: 3306,
    user: 'admin_annisa',
    password: 'password',
});

connection.connect;
module.exports = connection;