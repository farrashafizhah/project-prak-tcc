const mysql = require("mysql2");

const config = {
  host: "35.193.166.252",
  user: "root",
  password: "]<A#.,&x(>D.i6~G",
  database: "iphone_store",
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;
