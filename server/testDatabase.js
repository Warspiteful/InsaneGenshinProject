var mysql = require('mysql');

var con = mysql.createConnection("mysql://b81af54136f1a7:126af5a0@us-cdbr-east-05.cleardb.net/heroku_b3548b4ef16b308?reconnect=true");


function parseData(result, type) {

    switch (type) {
        case ("m_val"):
            return result.m_val;
    }

    return "HAHAHAH"
}


function parse(result) {

    return Object.values(result[0])[0]
}



function parseIntoArray(result) {
    return Object.values(JSON.parse(JSON.stringify(result)));
}


function getCharactersStored() {


    let sql = "SELECT charName FROM characterdb;"
    console.log(executeSQL(sql))

}

function executeSQL(sql) {

    let re = ""
    return new Promise(data => {
        con.query(sql, function(err, result) {
            if (err) throw err;
            data(result);
        })
    })
};



con.connect(function(err) {
    type = "m_val"
    charName = "Keqing"
    category = "Element"
    num = 3
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT charName FROM characterdb;"
    getCharactersStored()

});