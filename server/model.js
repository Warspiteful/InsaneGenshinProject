//@ts-check

require('dotenv').config()

var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

const { readModel } = require('./readModel')


class Model extends readModel {

    multiplier = .5;


    parseIntoArray(result) {
        return Object.values(JSON.parse(JSON.stringify(result)));
    }


    async getCharactersStored() {
        let nameArray = []
        this.parseIntoArray(
            this.executeSQL("SELECT charName FROM characterdb;")
        ).forEach((nameObj) => nameArray.push(nameObj.charName))
        return nameArray
    }

    calculateReturnPoints(selected, others, type) {
        let val = 0;

        (async function() {

            for (var i = 0; i < others.length; i++) {
                val += this.multiplier * (await this.parseReturn(others[i], type) - await this.parseReturn(selected, type));
                if (val < 1) {
                    val = 1;
                }
            }
            this.parseIncrement(selected, val, type);
        })

    }

    parseData(result) {

        return Object.values(result[0])[0]
    }



    parseIncrement(char, val, type) {
        this.executeSQL("UPDATE characterdb SET " + type + " =  " + type + " + " + val + " WHERE charName = '" + char.name + "'");
    }

    selectFMK(F, M, K) {
        this.calculateReturnPoints(F, [M, K], this.category.f_val);
        this.calculateReturnPoints(M, [F, K], this.category.m_val);
        this.calculateReturnPoints(K, [M, F], this.category.k_val);
    }
}

exports.Model = Model;