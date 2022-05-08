var mysql = require('mysql');

var con = mysql.createConnection("mysql://b81af54136f1a7:126af5a0@us-cdbr-east-05.cleardb.net/heroku_b3548b4ef16b308?reconnect=true");

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM characterdb ORDER BY RAND() LIMIT 3;";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        console.log(result[0].charName);
    });
});