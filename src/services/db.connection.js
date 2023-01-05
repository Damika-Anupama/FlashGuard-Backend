const mysql = require('mysql2/promise');
const config = require('../config/config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results, ] = await connection.execute(sql, params);
  connection.end(function(err) {
    if (err) throw err;
  });
  return results;
}

module.exports = {
  query
}