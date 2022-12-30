const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'flashguard.mysql.database.azure.com',
  user: 'damiboyflashguard123',
  password: 'eFP@9RxH2m4H',
  database: 'flashguard'
});

module.exports = connection;
