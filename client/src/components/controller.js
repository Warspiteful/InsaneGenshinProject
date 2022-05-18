import draggable from 'vuedraggable'
import axios from 'axios'
import Vue from 'vue'
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

export default {
    name: 'HelloWorld',

    components: {
        draggable,
    },

    metaInfo: {
        title: 'Genshin Fuck Marry Kill',
        // override the parent template and just use the above title only
        titleTemplate: null,

        meta: [
            { charset: 'utf-8' },
            {
                name: 'description',
                content: 'This is an insane little program I made because FMK has a lot of data, and I like data.',
            },
        ],
    },

    methods: {
        submitRound() {
            (async() => {
                await axios.post('https://genshin-project.herokuapp.com/submit', {
                    fuck: this.cards[0].title,
                    marry: this.cards[1].title,
                    kill: this.cards[2].title,
                })
            })()
            this.update()
        },

        setTitle(name, index) {
            this.cards[index].title = name
        },

        async updateData() {

            const stat = await axios.get(
                'https://genshin-project.herokuapp.com/stats',
            )

            const char = stat.data.char
            for (let i = 0; i < char.length; i++) {
                this.chars[i] = {}
                this.chars[i].name = char[i].charName
                this.chars[i].src = char[i].Image
                this.chars[i].desc = char[i].title
                this.chars[i].attributes = {}
                this.chars[i].attributes.element = {
                    title: 'Element',
                    val: char[i].Element,
                }
                this.chars[i].attributes.weapon = {
                    title: 'Region',
                    val: char[i].Region,
                }
                this.chars[i].attributes.region = {
                    title: 'Weapon',
                    val: char[i].Weapon,
                }
                this.chars[i].stats = {}

                this.chars[i].stats.f_val = {
                    title: 'Fuck',
                    num: Math.round((char[i].f_val / char[i].total) * 100),
                }
                this.chars[i].stats.m_val = {
                    title: 'Marry',
                    num: Math.round((char[i].m_val / char[i].total) * 100),
                }
                this.chars[i].stats.k_val = {
                    title: 'Kill',
                    num: Math.round((char[i].k_val / char[i].total) * 100),
                }
            }

            const attributes = stat.data.attr

            for (let i = 0; i < attributes.length; i++) {
                this.attr[attributes[i].title] = {}
                    // console.log(attributes[i].val);
                    // console.log(attributes[i].val.length);
                console.log(this.attr);

                let label = attributes[i].title
                attributes[i].title = {}

                for (let j = 0; j < attributes[i].val.length; j++) {
                    let values = attributes[i].val[j]
                    let valLabel = values.Category
                    this.attr[label][valLabel] = {}
                    this.attr[label][valLabel].val = {}

                    this.attr[label][valLabel].val[this.categories[0]] = {
                        percent: Math.round((values.f / values.total) * 100),
                        total: values.f,
                    }
                    this.attr[label][valLabel].val[this.categories[1]] = {
                        percent: Math.round((values.m / values.total) * 100),
                        total: values.m,
                    }
                    this.attr[label][valLabel].val[this.categories[2]] = {
                        percent: Math.round((values.k / values.total) * 100),
                        total: values.k,
                    }

                }
            }


        },

        updateStatCallback() {
            (async() => {
                await this.updateData();
            })
        },

        update() {
            (async() => {
                await this.updateData();
                this.updateChar();
            })()
        },

        getRandom(arr, n) {
            var result = new Array(n),
                len = Object.keys(arr).length,
                keys = Object.keys(arr),
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = keys[Math.floor(Math.random() * len)];
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        },

        updateChar() {
            console.log(this.chars);
            let res = this.getRandom(this.chars, 3)
            for (var i = 0; i < res.length; i++) {
                this.cards[i].title = ''
                this.cards[i].src = ''
                this.cards[i].title = res[i].name
                this.cards[i].src = res[i].src
            }

        }
    },

    addItem(item) {
        const removed = this.tabs.splice(this.tabs.length - 1, 1)
        this.tabs.push(...this.more.splice(this.more.indexOf(item), 1))
        this.more.push(...removed)
        this.$nextTick(() => {
            this.currentItem = 'tab-' + item
        })
    },

    toggleLabel(adultMode) {
        if (adultMode) {
            this.categories[0] = 'Fuck'
        } else {
            this.categories[0] = 'Friend'
        }
    },
    mounted() {
        this.update()
    },

    data: () => ({
        filter: null,
        adultMode: null,
        miscBar: null,
        charsBar: null,
        statBar: null,
        charBar: null,
        navBar: null,
        dialog: false,
        miscCat: ['Credits', 'Filters', 'Settings'],
        navBarCat: ['Characters', 'Analysis', 'Settings'],
        categories: ['Friend', 'Marry', 'Kill'],
        cards: [{
                title: 'Childe',
                src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Albedo_Card_irlhqz.webp',
                flex: 4,
            },
            {
                title: 'Keqing',
                src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144524/genshin-cards/Character_Jean_Card_pkkijg.webp',
                flex: 4,
            },
            {
                title: 'Ganyu',
                src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Ganyu_Card_bsvedg.webp',
                flex: 4,
            },
        ],
        chars: [{}],
        attr: {},
        tabs: [],
        displayedChars: [],
    }),
}