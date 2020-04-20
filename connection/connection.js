const mysql = require("mysql");
    let connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "yourPassword",
        database: "employee_management"
    })

  connection.connect();
  module.exports = connection;
