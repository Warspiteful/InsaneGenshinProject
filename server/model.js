//@ts-check


const { readModel } = require('./readModel')


class Model extends readModel {



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
        let val = 1;

        (async() => {

            await this.parseIncrement(selected, val, type);
        })();

    }

    parseData(result) {
        return Object.values(result[0])[0]
    }



    async parseIncrement(char, val, type) {
        console.log(char);
        this.executeSQL("UPDATE characterdb SET " + type + " =  " + type + " + " + val + " WHERE charName = '" + char + "'");

    }


    selectFMK(F, M, K) {
        (async() => {
            this.log(F, M, K);
        })();
        this.calculateReturnPoints(F, [M, K], this.category.f);
        this.calculateReturnPoints(M, [F, K], this.category.m);
        this.calculateReturnPoints(K, [M, F], this.category.k);

    }
}

exports.Model = Model;