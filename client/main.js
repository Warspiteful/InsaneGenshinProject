class Category {
    static f = new Category("Fuck");
    static m = new Category("Marry");
    static k = new Category("Kill");

    constructor(name) {
        this.name = name;
    }

}

class Family extends Category {
    f = new Category("Friend");
}

class Character {

    f = 0;
    m = 0;
    k = 0;

    familyFriendly = false;

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

    getvals() {
        return [this.f, this.m, this.k];
    }

    parseIncrement(val, type) {
        switch (type) {
            case Category.f:
                this.incrementF(val)
                break;
            case Category.k:
                this.incrementKill(val);
                break;
            case Category.m:
                this.incrementMarry(val);
                break;
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

    familyFriendly = false;

    setFamilyFriendly(boolean) {
        this.familyFriendly = boolean;
    }

    getFamilyFriendly() {
        return this.familyFriendly;
    }

    addChar(charList) {
        for (var i = 0; i < charList.length; i++) {
            if (charList[i] instanceof Character) {
                this.characters.push(charList[i]);

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

    getCharArray(characterName) {
        return this.getCharacter(characterName).getvals();
    }

    retrieveIndex(characterName) {
        const index = this.characters.findIndex(object => {
            return object.name == characterName;
        });

        if (index != -1) {
            return index;
        }
        console.log("Error: " + characterName);

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
}


class View {

    titles = new Map();

    displays = new Map();

    constructor(model) {
        this.model = model;
        this.fillMap();
        this.createTexts();
    }

    updateModel(model) {
        this.model = model;
        this.updateTexts();
    }

    fillMap() {
        if (manager.getFamilyFriendly()) {
            this.titles.set(Family.f, "Most Friendable:")
        } else {
            this.titles.set(Category.f, "Most Fuckable:")
        }
        this.titles.set(Category.m, "Most Marriagable:")
        this.titles.set(Category.k, "Most Killable:")
    }


    createTexts() {
        let display = document.querySelectorAll(".displayHolder");

        if (display.length > 1) {
            throw new RangeError("Detected too many displays");
        }

        display = display[0];


        this.titles.forEach((value, key) => {

            let disp = document.createElement("div");
            disp.classList.add("textDisplay");
            let title = document.createElement("p");
            title.id = key.name;
            title.innerText = value;
            display.appendChild(disp);
            disp.appendChild(title);

            this.displays.set(key, title);
        })


    }

    updateTexts() {

        this.displays.forEach((value, key) => {
            let title = value.innerText.split(':')[0];
            value.innerText = title + ": " + manager.getMax(key);
        });
    }

    renderList() {
        let string = "";
        manager.getCharactersStored().forEach((name) => string = string.concat(name + " " + manager.getCharArray(name) + "\n"))
        alert(string)
    }

}

let manager = new Manager();

let regulars = [
    new Character("Ganyu", "./Images/Character_Ganyu_Card.webp"),
    new Character("Beidou", "Images/Character_Beidou_Card.webp"),
    new Character("Diluc", "./Images/Character_Diluc_Card.webp"),
    new Character("Yanfei", "./Images/Character_Yanfei_Card.webp"),
    new Character("Ningguang", "./Images/Character_Ningguang_Card.webp"),
    new Character("Sara", "Images/Character_Kujou_Sara_Card.webp"),
    new Character("Keqing", "Images/Character_Keqing_Card.webp"),
    new Character("Itto", "Images/Character_Arataki_Itto_Card.webp"),
    new Character("Eula", "Images/Character_Eula_Card.webp"),
    new Character("Beidou", "Images/Character_Beidou_Card.webp"),
    new Character("Gorou", "Images/Character_Gorou_Card.webp"),
    new Character("Jean", "Images/Character_Jean_Card.webp"),
    new Character("Aether", "Images/Traveler_Male_Card.webp"),
    new Character("Lumine", "Images/Traveler_Female_Card.webp"),
    new Character("Hu Tao", "Images/Character_Hu_Tao_Card.webp"),
    new Character("Kaedehara Kazuha", "Images/Character_Kaedehara_Kazuha_Card.webp"),
    new Character("Kaeya", "Images/Character_Kaeya_Card.webp"),
    new Character("Kamisato Ayaka", "Images/Character_Kamisato_Ayaka_Card.webp"),
    new Character("Kamisato Ayato", "Images/Character_Kamisato_Ayato_Card.webp"),
    new Character("Kuki Shinobu", "Images/Character_Kuki_Shinobu_Card.webp"),
    new Character("Lisa", "Images/Character_Lisa_Card.webp"),
    new Character("Mona", "Images/Character_Mona_Card.webp"),
    new Character("Rosaria", "Images/Character_Rosaria_Card.webp"),
    new Character("Sangonomiya Kokomi", "Images/Character_Sangonomiya_Kokomi_Card.webp"),
    new Character("Shenhe", "Images/Character_Shenhe_Card.webp"),
    new Character("Childe", "Images/Character_Tartaglia_Card.webp"),
    new Character("Thoma", "Images/Character_Thoma_Card.webp"),
    new Character("Venti", "Images/Character_Venti_Card.webp"),
    new Character("Xiao", "Images/Character_Xiao_Card.webp"),
    new Character("Yae Miko", "Images/Character_Yae_Miko_Card.webp"),
    new Character("Yelan", "Images/Character_Yelan_Card.webp"),
    new Character("Yoimiya", "Images/Character_Yoimiya_Card.webp"),
    new Character("Yun Jin", "Images/Character_Yun_Jin_Card.webp"),
    new Character("Zhongli", "Images/Character_Zhongli_Card.webp"),
    new Character("Albedo", "Images/Character_Albedo_Card.webp"),
    new Character("Amber", "Images/Character_Amber_Card.webp"),
]

manager.addChar(regulars);


let kiddos = [
    new Character("Chongyun", "Images/Character_Chongyun_Card.webp"),
    new Character("Fischl", "Images/Character_Fischl_Card.webp"),
    new Character("Xinyan", "Images/Character_Xinyan_Card.webp"),
    new Character("Barbara", "Images/Character_Barbara_Card.webp"),
    new Character("Diona", "Images/Character_Diona_Card.webp"),
    new Character("Klee", "Images/Character_Klee_Card.webp"),
    new Character("Noelle", "Images/Character_Noelle_Card.webp"),
    new Character("Qiqi", "Images/Character_Qiqi_Card.webp"),
    new Character("Razor", "Images/Character_Razor_Card.webp"),
    new Character("Sayu", "Images/Character_Sayu_Card.webp"),
    new Character("Sucrose", "Images/Character_Sucrose_Card.webp"),
    new Character("Xiangling", "Images/Character_Xiangling_Card.webp"),
    new Character("Xingqiu", "Images/Character_Xingqiu_Card.webp"),
]

let Alloy = new Character("Aloy", "Images/Character_Aloy_Card.webp");



let textView = new View(manager);

manager.playRound()

document.getElementById("submitRound").onsubmit = function() //Runs code when button is pressed
    {
        let cats = document.querySelectorAll(".category");

        let chars = new Map();
        for (let i = 0; i < cats.length; i++) {
            let img = cats[i].querySelectorAll('.item')

            chars.set(cats[i].id, img[0].id);
        }

        console.log(chars)
        console.log(cats)
        console.log(chars.get("Fuck"));
        console.log(chars.get("Marry"));
        console.log(chars.get("Kill"));

        document.querySelectorAll("#fuck")[0].value = chars.get("Fuck")
        document.querySelectorAll("#marry")[0].value = chars.get("Marry")
        document.querySelectorAll("#kill")[0].value = chars.get("Kill")

        manager.selectFMK(chars.get("Fuck"), chars.get("Marry"), chars.get("Kill"));
        textView.updateModel(manager);
        manager.playRound();

    }

document.getElementById("Results").onclick = function() //Runs code when button is pressed
    {
        let cats = document.querySelectorAll(".category");

        let chars = new Map();
        for (let i = 0; i < cats.length; i++) {
            let img = cats[i].querySelectorAll('.item')

            chars.set(cats[i].id, img[0].id);
        }
        console.log(document.querySelectorAll("#fuck"))
        document.querySelectorAll("#fuck")[0].value = chars.get("Fuck");
        document.querySelectorAll("#marry")[0].value = chars.get("Marry");
        document.querySelectorAll("#kill")[0].value = chars.get("Kill");

        //        textView.renderList();
    }