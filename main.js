class Category {
    static f = new Category("Fuck");
    static m = new Category("Marry");
    static k = new Category("Kill");

    constructor(name) {
        this.name = name;
    }

}

class Character {

    f = 0;
    m = 0;
    k = 0;

    constructor(name, imagePath) {
        this.name = name;

        const img = new Image();

        this.imagePath = imagePath;
        this.f = 0;
        this.m = 0;
        this.k = 0;
    }

    getImage() {
        return this.imagePath;
    }

    incrementKill(val) {
        this.k += val;
    }

    incrementMarry(val) {
        this.m += val;
    }

    incrementF(val) {
        this.f += val;
    }

    getKill() {
        return this.k;
    }

    getMarry() {
        return this.m;
    }

    getF() {
        return this.f;
    }

    getName() {
        return this.name;
    }

    parseIncrement(val, type) {
        switch (type) {
            case Category.f:
                this.incrementF(val)
                break;
            case Category.k:
                this.incrementKill(val);
            case Category.m:
                this.incrementMarry(val);
        }
    }

    parseReturn(type) {

        switch (type) {
            case Category.f:
                return this.getF();
            case Category.k:
                return this.getKill();
            case Category.m:
                return this.getMarry();
        }
    }
}

class Manager {

    multiplier = .5;

    characters = [];

    addChar(...args) {
        for (var i = 0; i < args.length; i++) {
            if (args[i] instanceof Character) {
                this.characters.push(args[i]);

            } else {
                console.log("Failed to add")
            }
        }
    }

    getRandomChars(num) {
        var result = new Array(num),
            len = this.characters.length,
            taken = new Array(len);
        if (num > len) {
            throw new RangeError("more elements taken than available");
        }

        while (num--) {
            var x = Math.floor(Math.random() * len);
            result[num] = this.characters[x in taken ? taken[x] : x]
            taken[x] = --len in taken ? taken[len] : len;
        }

        return result;

    }

    retrieveIndex(characterName) {
        const index = this.characters.findIndex(object => {
            return object.name == characterName;
        });

        if (index != -1) {
            return index;
        }
        console.log("Error");

    }

    getImage(characterName) {
        let index = this.retrieveIndex(characterName);

        if (index != -1) {
            return this.characters[index].getImage();
        }

        return;
    }

    getCharactersStored() {
        const names = [];

        for (var i = 0; i < this.characters.length; i++) {
            names.push(this.characters[i].getName());
        }

        return names;
    }

    getCharacter(characterName) {
        let index = this.retrieveIndex(characterName);

        if (index != -1) {
            return this.characters[index];
        }
        return;

    }

    calculateReturnPoints(selected, others, type) {
        let val = 0;

        for (var i = 0; i < others.length; i++) {
            if (others[i] instanceof Character) {


                val += this.multiplier * (others[i].parseReturn(type) - selected.parseReturn(type));
                if (val < 1) {
                    val = 1;
                }
            }
        }

        if (selected instanceof Character) {
            selected.parseIncrement(val, type);
        }
    }

    selectFMK(F, M, K) {

        F = this.getCharacter(F);
        M = this.getCharacter(M);
        K = this.getCharacter(K);
        this.calculateReturnPoints(F, [M, K], Category.f);
        this.calculateReturnPoints(M, [F, K], Category.m);
        this.calculateReturnPoints(K, [M, F], Category.k);
    }


    playRound() {
        let roundChars = this.getRandomChars(3);
        let src = document.getElementById("imageHolder");
        for (let i = 0; i < roundChars.length; i++) {
            let img = document.createElement("img");
            img.src = roundChars[i].getImage();
            src.appendChild(img);
            img.classList.add("item");

        }



    }
}



let manager = new Manager();

const Ganyu = new Character("Ganyu", "./Images/Character_Ganyu_Card.webp")
const Diluc = new Character("Diluc", "./Images/Character_Diluc_Card.webp")
const Yanfei = new Character("Yanfei", "./Images/Character_Yanfei_Card.webp")

const Ningguang = new Character("Ningguang", "./Images/Character_Ningguang_Card.webp")
const Sara = new Character("Sara", "Images/Character_Kujou_Sara_Card.webp")
const Keqing = new Character("Keqing", "Images/Character_Keqing_Card.webp")
const Itto = new Character("Itto", "Images/Character_Arataki_Itto_Card.webp")
const Fischl = new Character("Fischl", "Images/Character_Fischl_Card.webp")
const Eula = new Character("Eula", "Images/Character_Eula_Card.webp")
const Xinyan = new Character("Xinyan", "Images/Character_Xinyan_Card.webp")

manager.addChar(Ganyu, Diluc, Yanfei, Ningguang, Sara, Keqing, Itto, Fischl, Eula, Xinyan);


manager.playRound();

console.log("Hi");