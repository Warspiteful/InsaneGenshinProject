require('dotenv').config()

var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})


class readModel {

    category = {
        "f": "f_val",
        "m": "m_val",
        "k": "k_val"
    }

    async log(F, M, K) {
        (async() => {
            await this.executeSQL("INSERT INTO `heroku_b3548b4ef16b308`.`choicelog` (`f`, `m`, `k`) VALUES ('" + F + "', '" + M + "', '" + K + "')");
        })();
    }



    async getRandomChars() {
        let val = await this.executeSQL("SELECT charName,Image FROM characterdb ORDER BY rand() LIMIT 3;");
        return this.parseIntoArray(val);
    }

    async getCharArray(characterName) {
        return this.parseIntoArray(
            this.executeSQL("SELECT f_val,m_val,k_val FROM characterdb WHERE charName = '" + characterName + "';")
        )

    }


    async getAll() {
        let val = await this.executeSQL("SELECT *, f_val + m_val + k_val total FROM characterdb ORDER BY charName ASC;");
        return val;
    }

    async getAttr() {
        let element = await this.executeSQL("SELECT Element Category,Sum(f_val) f,Sum(m_val) m ,Sum(k_val) k,  Sum(f_val) + Sum(m_val) + Sum(k_val) total FROM heroku_b3548b4ef16b308.characterdb group by Element");
        let weapon = await this.executeSQL("SELECT Weapon Category,Sum(f_val) f,Sum(m_val) m ,Sum(k_val) k,  Sum(f_val) + Sum(m_val) + Sum(k_val) total FROM heroku_b3548b4ef16b308.characterdb group by Weapon");
        let region = await this.executeSQL("SELECT Region Category,Sum(f_val) f,Sum(m_val) m ,Sum(k_val) k,  Sum(f_val) + Sum(m_val) + Sum(k_val) total FROM heroku_b3548b4ef16b308.characterdb group by Region");
        let gender = await this.executeSQL("SELECT Gender Category,Sum(f_val) f,Sum(m_val) m ,Sum(k_val) k,  Sum(f_val) + Sum(m_val) + Sum(k_val) total FROM heroku_b3548b4ef16b308.characterdb group by Gender");



        return [{ title: "Element", val: element }, { title: "Weapon", val: weapon }, { title: "Region", val: region }, { title: "Gender", val: gender }];
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
        let val = await this.executeSQL("SELECT " + type + " FROM characterdb WHERE charName = '" + char + "';");
        return this.parseData(val);
    }

    async executeSQL(sql) {
        const pro = new Promise(resolve => {
            con.query(sql, function(err, result) {
                if (err) {
                    console.log("ERROR");
                    throw err;
                }
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