const mysql = require('mysql2');
const db = require('../routes');

const pool = mysql.createPool({
    
    host: 'localhost',
    user: 'root',
    password: 'Facebook23!!',
    database: 'csc317',
    connectionLimit: 50,
    debug: false,
});


const promisePool = pool.promise();
module.exports = promisePool;