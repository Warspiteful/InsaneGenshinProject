class Controller {

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

        var charArray = [{ "id": "Keqing", "image": "reddit.com" }];

    }


}