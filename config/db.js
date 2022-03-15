const mysql = require('mysql')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Supermercado'
})
connection.getConnection((err, conn) => {
    if (err) {
        console.error('Not connected. ERROR: ' + err.stack)
        return
    }
    console.log('Connect with Success')    
    return connection;
})
module.exports = connection;