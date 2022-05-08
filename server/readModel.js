class readModel {


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
}