//@ts-check



class Controller {

    constructor(model) {
        this.model = model;
    }

    sendRound(fuckName, marryName, killName) {

        (async function() {
            await this.model.selectFMK(fuckName, marryName, killName);
            this.view.updateModel(this.model);
        })


    }


    changeCharacters() {
        (async function() {
            let chars = await this.model.getRandomChars()
            this.view.updateCharacters(chars)
        });
    }

    playGame() {
        this.model.getCategoryArray().forEach(
            cat => {
                this.view.createHolders(cat);
            });
        this.view.updateCharacters();

        /*  for (let i = 0; i < roundChars.length; i++) {
              let container = this.createCategory(src, Object.values(Category)[i].name);
              let img = document.createElement("img");
              img.src = roundChars[i].getImage();
              img.id = roundChars[i].getName();
              container.appendChild(img);
              img.classList.add("item");
              img.style = "margins: 0 auto;"
          }
          */

    }
    processSubmission() {

        /*
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

        this.model.selectFMK(chars.get("Fuck"), chars.get("Marry"), chars.get("Kill"));
        textView.updateModel(this.model);
        this.model.playRound();
        */
    }

    displayResults() {
        /*
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

        */

    }
}






exports.Controller = Controller;