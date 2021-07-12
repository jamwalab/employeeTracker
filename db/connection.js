const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    //port: 3005,
    // SQL username
    user: 'root',
    //Your MySQL password
    password: 'P@$$word*7',
    database: 'employeetracker'
  },
  console.log('Connected to election database')
);

module.exports = db;