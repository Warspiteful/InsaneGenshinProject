//@ts-check

class Controller {


    constructor(model, view) {
        this.model = model;
        this.view = view;
    }


    changeCharacters() {
        (async function() {
            let chars = await this.model.getRandomChars()
            this.view.updateCharacters(chars)
        });
    }

    playRound() {

        this.view.setup();
        this.view.createCategories();
        this.view.updateCharacters();

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
    processSubmission() {
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

    displayResults() {
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




}



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