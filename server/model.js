require('dotenv').config()


var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

class Category {
    static f = new Category("f_val");
    static m = new Category("m_val");
    static k = new Category("k_val");

    constructor(name) {
        this.name = name;
    }
}


class Model {





    multiplier = .5;


    getRandomChars(num) {
        return this.executeSQL("SELECT * FROM characterdb ORDER BY RAND() LIMIT " + num + ";");
    }

    getCharArray(characterName) {
        return this.executeSQL("SELECT f_val,m_val,k_val FROM characterdb WHERE charName = " + characterName + ";");
    }


    getImage(characterName) {
        return this.executeSQL("SELECT Image FROM characterdb WHERE charName = " + characterName + ";");
    }

    getCharactersStored() {
        return this.executeSQL("SELECT charName FROM characterdb;");
    }

    getCharacter(characterName) {
        return this.executeSQL("SELECT * FROM characterdb WHERE charName = " + characterName + "");

    }

    calculateReturnPoints(selected, others, type) {
        let val = 0;



        for (var i = 0; i < others.length; i++) {
            val += this.multiplier * (parseReturn(others[i], type) - parseReturn(selected, type));
            if (val < 1) {
                val = 1;
            }
        }
        parseIncrement(selected.charName, val, type);
    }

    parseReturn(char, type) {
        return this.executeSQL("SELECT " + type.name + " FROM characterdb WHERE charName = " + char.charName + ";");
    }

    parseIncrement(char, val, type) {
        this.executeSQL("UPDATE characterdb SET " + type.name + " =  " + type.name + " + " + val + " WHERE name = " + char.name + "");
    }

    selectFMK(F, M, K) {

        F = this.getCharacter(F);
        M = this.getCharacter(M);
        K = this.getCharacter(K);
        this.calculateReturnPoints(F, [M, K], Category.f);
        this.calculateReturnPoints(M, [F, K], Category.m);
        this.calculateReturnPoints(K, [M, F], Category.k);
    }


    createCategory(src, categoryName) {

        let divider = document.createElement("div");

        divider.classList.add("col-md-4");
        src.appendChild(divider);

        let label = document.createElement("h2");
        label.innerText = categoryName;
        label.style = "text-align: center;"


        let container = document.createElement("div");
        container.id = categoryName;
        container.classList = "category";

        divider.appendChild(label);

        divider.appendChild(container);
        return container;
    }

    playRound() {
        let src = document.getElementById("imageHolder");
        while (src.lastElementChild) {
            src.removeChild(src.lastElementChild);
        }

        let roundChars = this.getRandomChars(3);
        for (let i = 0; i < roundChars.length; i++) {
            let container = this.createCategory(src, Object.values(Category)[i].name);
            let img = document.createElement("img");
            img.src = roundChars[i].getImage();
            img.id = roundChars[i].getName();
            container.appendChild(img);
            img.classList.add("item");
            img.style = "margins: 0 auto;"
        }
    }

    getMax(category) {
        let sorted = this.characters.slice().sort((a, b) => a.parseReturn(category) - b.parseReturn(category));

        return sorted.pop().getName();

    }


    executeSQL(sql) {
        con.query(sql, function(err, result) {
            if (err) throw err;
            return result;
        });
    }
}