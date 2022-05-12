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
    return JSON.parse(JSON.stringify(result));
}


function getCharactersStored() {

    type = "m_val"
    charName = "Keqing"
    category = "Element"
    val = 3;



    (async function() {
        val = await executeSQL("select charName from characterdb" +
            " ORDER BY " + "k_val" + " DESC " +
            "LIMIT 1;");
        val = parse(val);
        console.log(val);
    })();

}

async function executeSQL(sql) {
    console.log(sql);
    const pro = new Promise(resolve => {
        con.query(sql, function(err, result) {
            if (err) throw err;
            resolve(result);
        })
    });

    return pro.then((val) => {
        return val;
    })
};



con.connect(function(err) {
    type = "k_val"
    charName = "Kujou Sara"
    category = "Element"
    val = 1
    sql = "UPDATE characterdb SET k_val = 1 + k_val WHERE charName = 'Kujou Sara'";

    (async() => {
        await executeSQL(sql);
    })();
    //    getCharactersStored();



})