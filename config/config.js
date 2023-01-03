const fs = require('fs');

// const config = {
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'flashguard'
// };

const config = {
  host: 'flashguard.mysql.database.azure.com',
  user: 'damiboyflashguard123',
  password: 'eFP@9RxH2m4H',
  database: 'flashguard',
  port: 3306,
  ssl: {
    ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
  }
};

module.exports = config;
