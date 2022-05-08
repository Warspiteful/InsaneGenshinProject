//@ts-check

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

        let element = display[0];


        this.titles.forEach((value, key) => {

            let disp = document.createElement("div");
            disp.classList.add("textDisplay");
            let title = document.createElement("p");
            title.id = key.name;
            title.innerText = value;
            element.appendChild(disp);
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
        let display = document.querySelectorAll(".charDisplay[type='img']");

        for (let i = 0; i < display.length; i++) {
            if (!(display[i] instanceof HTMLImageElement)) {

            }
            display[i].id = imageNameArray[i].name;
            // @ts-ignore
            display[i].src = imageNameArray[i].image;
        }
    }


    createHolders(category) {

        let src = document.getElementById("imageHolder");

        for (let categoryName in category) {
            let divider = document.createElement("div");

            divider.classList.add("col-md-4");
            src.appendChild(divider);

            let label = document.createElement("h2");
            label.innerText = categoryName;
            label.style.textAlign = "center"

            let container = document.createElement("div");
            container.id = categoryName;
            container.classList.add("category");

            divider.appendChild(label);

            divider.appendChild(container);
        }
    }
}