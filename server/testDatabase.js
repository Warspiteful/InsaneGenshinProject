var mysql = require('mysql');

var con = mysql.createConnection("mysql://b81af54136f1a7:126af5a0@us-cdbr-east-05.cleardb.net/heroku_b3548b4ef16b308?reconnect=true");


function parseData(result, type) {

    switch (type) {
        case ("m_val"):
            return result.m_val;
    }

    return "HAHAHAH"
}

con.connect(function(err) {
    type = "m_val"
    charName = "Keqing"
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT " + type + " FROM characterdb WHERE charName = '" + charName + "';";
    con.query(sql, function(err, result) {
        if (err) throw err;

        console.log(parseData(result[0], type))
    });
});