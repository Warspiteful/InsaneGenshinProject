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


import { readModel } from './readModel';


export class Model extends readModel {

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



}