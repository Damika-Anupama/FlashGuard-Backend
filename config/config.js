var fs = require('fs');
const serverCa = [fs.readFileSync("${__dirname}/DigiCertGlobalRootCA.crt.pem", "utf8")];
var config={
  host: 'flashguard.mysql.database.azure.com',
  user: 'damiboyflashguard123',
  password: 'eFP@9RxH2m4H',
  database: 'flashguard',
  port: 3306,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
};

module.exports = config;
