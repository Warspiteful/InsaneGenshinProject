import draggable from "vuedraggable";
import axios from "axios";


export default {

    name: 'HelloWorld',

    components: {
        draggable,
    },

    methods: {

        submitRound() {


            (async() => {
                await axios.post('http://localhost:5000/submit', {
                    "fuck": this.cards[0].title,
                    "marry": this.cards[1].title,
                    "kill": this.cards[2].title
                })
            })();
            this.updateChar();


        },

        setTitle(name, index) {
            this.cards[index].title = name;

        },

        updateStats() {
            (async() => {

                const stat = await axios.get('http://localhost:5000/stats', )

                for (let i = 0; i < stat.data.length; i++) {
                    this.chars[i] = {}
                    this.chars[i].name = stat.data[i].charName;
                    this.chars[i].src = stat.data[i].Image;
                    this.chars[i].desc = stat.data[i].title;
                    this.chars[i].attributes = {};
                    this.chars[i].attributes.element = { title: "Element", val: stat.data[i].Element }
                    this.chars[i].attributes.weapon = { title: "Region", val: stat.data[i].Region }
                    this.chars[i].attributes.region = { title: "Weapon", val: stat.data[i].Weapon }
                    this.chars[i].stats = {}
                    this.chars[i].stats.f_val = { title: "Fuck", num: stat.data[i].f_val }
                    this.chars[i].stats.m_val = { title: "Marry", num: stat.data[i].m_val }
                    this.chars[i].stats.k_val = { title: "Kill", num: stat.data[i].k_val }
                }
            })();

        },
        updateChar() {

            console.log("CHECKED");

            (async() => {

                console.log("Entered Async");

                const res = await axios.get('http://localhost:5000/resp', )
                for (var i = 0; i < res.data.length; i++) {
                    this.cards[i].title = "";
                    this.cards[i].src = "";
                    this.cards[i].title = res.data[i].charName;
                    this.cards[i].src = res.data[i].Image;
                }



                this.updateStats();

            })();

        },
    },
    mounted() {
        this.updateStats();
        this.updateChar();
        console.log("HEY");
    },

    data: () => ({
        charBar: null,
        navBar: null,
        dialog: false,
        navBarCat: [
            "Characters", "Analysis", "Settings"
        ],
        categories: [
            "Fuck", "Marry", "Kill"
        ],
        cards: [
            { title: 'Childe', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Albedo_Card_irlhqz.webp', flex: 4 },
            { title: 'Keqing', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144524/genshin-cards/Character_Jean_Card_pkkijg.webp', flex: 4 },
            { title: 'Ganyu', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Ganyu_Card_bsvedg.webp', flex: 4 },
        ],
        chars: [{}]
    }),
}