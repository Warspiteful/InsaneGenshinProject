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
                this.chars[i].attributes.region = {
                    title: 'Region',
                    val: char[i].Region,
                }
                this.chars[i].attributes.weapon = {
                    title: 'Weapon',
                    val: char[i].Weapon,
                }
                this.chars[i].attributes.gender = {
                    title: 'Gender',
                    val: char[i].Gender,
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

        initialize() {
            (async() => {
                await this.updateData()
                this.displayedChars = this.chars

                this.updateChar()
            })()
        },

        updateStatCallback() {
            async() => {
                await this.updateData()
            }
        },

        update() {
            (async() => {
                await this.updateData()
                this.updateChar()
            })()
        },

        getRandom(arr, n) {
            var result = new Array(n),
                len = Object.keys(arr).length,
                keys = Object.keys(arr),
                taken = new Array(len)
            if (n > len)
                throw new RangeError('getRandom: more elements taken than available')
            while (n--) {
                var x = keys[Math.floor(Math.random() * len)]
                result[n] = arr[x in taken ? taken[x] : x]
                taken[x] = --len in taken ? taken[len] : len
            }
            return result
        },

        updateChar() {
            let res = this.getRandom(this.displayedChars, 3)
            for (var i = 0; i < res.length; i++) {
                this.cards[i].title = ''
                this.cards[i].src = ''
                this.cards[i].title = res[i].name
                this.cards[i].src = res[i].src
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
        filterMethod(index) {
            //    console.log(this.filter)
            let filteredList = []

            for (let i = 0; i < this.chars.length; i++) {
                if (
                    this.filter[0].length > 0 &&
                    !this.filter[0].includes(this.chars[i].attributes.element.val)
                ) {
                    continue
                }

                if (
                    this.filter[1].length > 0 &&
                    !this.filter[1].includes(this.chars[i].attributes.weapon.val)
                ) {
                    //            console.log(this.chars[i].attributes.weapon.val);
                    continue
                }

                if (
                    this.filter[2].length > 0 &&
                    !this.filter[2].includes(this.chars[i].attributes.region.val)
                ) {
                    continue
                }

                if (
                    this.filter[3].length > 0 &&
                    !this.filter[3].includes(this.chars[i].attributes.gender.val)
                ) {
                    continue
                }

                filteredList.push(this.chars[i])
            }
            this.displayedChars = filteredList

            //    console.log(filteredList);
            if (this.displayedChars.length < 3) {
                this.filter[index].pop();
                alert("Invalid Combination of Filters.");
            } else {
                this.updateChar();
            }
        },
    },

    mounted() {
        this.initialize()
    },

    data: () => ({
        filter: [
            [],
            [],
            [],
            []
        ],
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
                title: '',
                src: '',
                flex: 4,
            },
            {
                title: '',
                src: 'p',
                flex: 4,
            },
            {
                title: '',
                src: '',
                flex: 4,
            },
        ],
        chars: [{}],
        attr: {},
        tabs: [],
        displayedChars: [{}],
    }),
}