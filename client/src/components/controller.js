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
                await axios.post(process.env.database + '/submit', {
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

                const stat = await axios.get(process.env.database + '/stats', )

                const char = stat.data.char;
                for (let i = 0; i < char.length; i++) {
                    this.chars[i] = {}
                    this.chars[i].name = char[i].charName;
                    this.chars[i].src = char[i].Image;
                    this.chars[i].desc = char[i].title;
                    this.chars[i].attributes = {};
                    this.chars[i].attributes.element = { title: "Element", val: char[i].Element }
                    this.chars[i].attributes.weapon = { title: "Region", val: char[i].Region }
                    this.chars[i].attributes.region = { title: "Weapon", val: char[i].Weapon }
                    this.chars[i].stats = {}

                    this.chars[i].stats.f_val = { title: "Fuck", num: Math.round((char[i].f_val / char[i].total) * 100) }
                    this.chars[i].stats.m_val = { title: "Marry", num: Math.round((char[i].m_val / char[i].total) * 100) }
                    this.chars[i].stats.k_val = { title: "Kill", num: Math.round((char[i].k_val / char[i].total) * 100) }
                }

                const attributes = stat.data.attr;


                for (let i = 0; i < attributes.length; i++) {
                    this.attr[i] = {};

                    this.attr[i].title = attributes[i].title;
                    this.attr[i].item = {}

                    // console.log(attributes[i].val);
                    // console.log(attributes[i].val.length);
                    for (let j = 0; j < attributes[i].val.length; j++) {


                        this.attr[i][j] = {}

                        let values = attributes[i].val[j];

                        this.attr[i][j].title = values.Category;
                        this.attr[i][j].val = {};




                        this.attr[i][j].val[0] = { title: "Fuck", percent: Math.round((values.f / values.total) * 100), total: values.f }
                        this.attr[i][j].val[1] = { title: "Marry", percent: Math.round((values.m / values.total) * 100), total: values.m }
                        this.attr[i][j].val[2] = { title: "Kill", percent: Math.round((values.k / values.total) * 100), total: values.k }

                        //console.log(this.attr[i][j]);
                    }


                }



            })();

        },
        updateChar() {

            (async() => {


                const res = await axios.get(process.env.database + '/resp', )
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
        this.updateChar();
    },

    data: () => ({
        statBar: null,
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
        chars: [{}],
        attr: [{}]
    }),
}