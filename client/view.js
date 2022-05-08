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



    updateCharacters(imageNameArray) {
        let display = document.querySelectorAll(".charDisplay");

        for (let i = 0; i < display.length; i++) {
            disp[i].id = imageArray[i].name;
            disp[i].img = imageArray[i].image;

        }


    }

}


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