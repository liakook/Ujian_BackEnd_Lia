const mysql = require('mysql')


// UNTUK CREATE CONNECTION DENGAN MYSQL
const db = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password : 'jano123',
    database : 'movie',
    port : 3306
})

module.exports = db