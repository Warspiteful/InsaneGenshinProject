//@ts-check

require('dotenv').config()

var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


var category = {
    "f_val": 0,
    "m_val": 1,
    "k_val": 2
}


class Model {

    multiplier = .5;


    parseIntoArray(result) {
        return Object.values(JSON.parse(JSON.stringify(result)));
    }

    getRandomChars(num) {
        return this.parseIntoArray(
            this.executeSQL("SELECT charName, Image FROM characterdb ORDER BY RAND() LIMIT " + num + ";")
        );
    }

    getCharArray(characterName) {
        return this.parseIntoArray(
            this.executeSQL("SELECT f_val,m_val,k_val FROM characterdb WHERE charName = '" + characterName + "';")
        )

    }

    getImage(characterName) {
        return this.parseData(
            this.executeSQL("SELECT Image FROM characterdb WHERE charName = '" + characterName + "';")
        );
    }

    getCharactersStored() {
        let nameArray = []
        this.parseIntoArray(
            this.executeSQL("SELECT charName FROM characterdb;")
        ).forEach((nameObj) => nameArray.push(nameObj.charName))
        return nameArray
    }

    /**
     * 
     * @param {Text} characterName 
     * @returns 
     */
    getCharacter(characterName) {
        return this.executeSQL("SELECT * FROM characterdb WHERE charName = '" + characterName + "'");

    }

    calculateReturnPoints(selected, others, type) {
        let val = 0;

        for (var i = 0; i < others.length; i++) {
            val += this.multiplier * (this.parseReturn(others[i], type) - this.parseReturn(selected, type));
            if (val < 1) {
                val = 1;
            }
        }
        this.parseIncrement(selected, val, type);
    }

    parseData(result) {

        return Object.values(result[0])[0]
    }

    parseReturn(char, type) {
        return this.parseData(this.executeSQL("SELECT " + type + " FROM characterdb WHERE charName = '" + char + "';"));
    }

    parseIncrement(char, val, type) {
        this.executeSQL("UPDATE characterdb SET " + type + " =  " + type + " + " + val + " WHERE name = '" + char.name + "'");
    }

    selectFMK(F, M, K) {
        this.calculateReturnPoints(F, [M, K], category.f_val);
        this.calculateReturnPoints(M, [F, K], category.m_val);
        this.calculateReturnPoints(K, [M, F], category.k_val);
    }

    getMaxName(type) {
        return this.parseData(
            this.executeSQL(
                "select charName from characterdb" +
                " ORDER BY " + type + " DESC" +
                "LIMIT 1;")
        )
    }

    getMaxCategory(category, type) {
        return this.parseData(
            this.executeSQL(
                "select " + category + " from characterdb " +
                "group by " + category + " " +
                "ORDER BY sum( " + type + " ) DESC " +
                "LIMIT 1;")
        )
    }

    getCategoryArray() {
        return Object.keys(category)
    }

    executeSQL(sql) {
        con.query(sql, function(err, result) {
            if (err) throw err;
            return result;
        });
    }
}