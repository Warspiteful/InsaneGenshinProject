var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "genshinfmk"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "UPDATE characterdb SET f_val = 0 WHERE name = 'Keqing'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
});