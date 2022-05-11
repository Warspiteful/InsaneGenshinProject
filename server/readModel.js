require('dotenv').config()

var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


class readModel {

    category = {
        "f_val": 0,
        "m_val": 1,
        "k_val": 2
    }


    async getRandomChars(num) {
        return this.parseIntoArray(
            this.executeSQL("SELECT charName, Image FROM characterdb ORDER BY RAND() LIMIT " + num + ";")
        );
    }

    async getCharArray(characterName) {
        return this.parseIntoArray(
            this.executeSQL("SELECT f_val,m_val,k_val FROM characterdb WHERE charName = '" + characterName + "';")
        )

    }


    async getAll() {
        let val = await this.executeSQL("SELECT * FROM characterdb ORDER BY charName ASC;");
        return this.parseIntoArray(val);
    }
    async getImage(characterName) {
        return this.parseData(
            this.executeSQL("SELECT Image FROM characterdb WHERE charName = '" + characterName + "';")
        );
    }


    /**
     * 
     * @param {Text} characterName 
     * @returns 
     */
    async getCharacter(characterName) {
        return this.executeSQL("SELECT * FROM characterdb WHERE charName = '" + characterName + "'");

    }

    async parseReturn(char, type) {
        return this.parseData(this.executeSQL("SELECT " + type + " FROM characterdb WHERE charName = '" + char + "';"));
    }

    async executeSQL(sql) {
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


    getCategoryArray() {
        return Object.keys(this.category)
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
}

exports.readModel = readModel;