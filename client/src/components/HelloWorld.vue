<template>
  <v-app>
    <v-container fluid>
      <v-row align="center" justify="center">

        <v-col cols="4" align="center" justify="center" v-for="cat in categories" :key="cat">{{ cat }}</v-col>
      </v-row>
      <draggable v-model="cards">
        <TransitionGroup class="row" name="list">
          <v-col name="list" v-for="card in cards" :key="card.title" :cols="card.flex" align="center" justify="center">

            <v-card width="55%" height="auto" key="card.title">

              <v-img :src="card.src" class="white--text align-end">
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>

          </v-col>
        </TransitionGroup>
      </draggable>
    </v-container>

    <v-container>
      <v-row class="text-center" align-center>


        <v-col cols="12">
          <v-row>
            <v-col cols="12" order-sm="first" order="last" sm="4">
              Coded By Justin
            </v-col>
            <v-col cols="12" sm="4" order-sm="first" @click="printNames">
              <v-btn>Submit</v-btn>

            </v-col>
            <v-col cols="12" sm="4">
              <v-dialog v-model="dialog" width="47%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Click Me
                  </v-btn>
                </template>

                <v-card>
                  <v-toolbar flat color="primary" dark>
                    <v-toolbar-title>User Profile</v-toolbar-title>
                  </v-toolbar>
                  <v-tabs v-model="navBar" background-color="deep-purple accent-4" centered dark icons-and-text>
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab v-for="(cat, index) in navBarCat" :key="index">
                      {{ cat }}
                    </v-tab>

                  </v-tabs>

                  <v-tabs-items v-model="navBar">
                    <v-tab-item key="0">
                      <v-tabs vertical fixed-tabs>
                        <v-tab v-for="(char, index) in chars" :key="index">
                          {{ char.name }}
                        </v-tab>


                        <v-tab-item v-for="char in chars" :key="char.name">

                          <v-card flat>
                            <v-list-item>
                              <v-list-item-content color="grey">
                                <v-img :src="char.src" class="white--text align-end"></v-img>
                              </v-list-item-content>
                              <v-list-item-content>

                                <v-card-text class="text-center">
                                  <v-row>
                                    <v-col cols="12">
                                      <h1>{{ char.name }}</h1>
                                    </v-col>
                                    <v-col cols="12">
                                      <hr>
                                    </v-col>
                                    <v-col cols="12">
                                      <h3>{{ char.desc }}</h3>
                                    </v-col>
                                    <v-col cols="12">
                                      <hr>
                                    </v-col>
                                    <v-col cols="4" v-for="stat in char.stats" :key="stat.key">
                                      <h2>{{ stat.title }}</h2>{{ stat.num }}
                                    </v-col>
                                    <v-col cols="12">
                                      <hr>
                                    </v-col>

                                    <v-col cols="4" v-for="attr in char.attributes" :key="attr.key">
                                      <h2>{{ attr.title }}</h2>{{ attr.val }}
                                    </v-col>

                                  </v-row>
                                </v-card-text>
                              </v-list-item-content>

                            </v-list-item>

                          </v-card>

                        </v-tab-item>

                      </v-tabs>
                    </v-tab-item>


                    <v-tab-item key="1">
                      <v-tabs vertical fixed-tabs>
                        <v-tab>
                          Insert Analysis Here
                        </v-tab>


                        <v-tab-item>
                          <v-card flat>
                            <v-card-text>
                              Insert DATA HERE
                            </v-card-text>
                          </v-card>
                        </v-tab-item>

                      </v-tabs>
                    </v-tab-item>

                    <v-tab-item key="2">
                      <v-tabs vertical fixed-tabs>
                        <v-tab>
                          Setting 1
                        </v-tab>


                        <v-tab-item>
                          <v-card flat>
                            <v-card-text>
                              SETTING 1 CONFIG HERE
                            </v-card-text>
                          </v-card>
                        </v-tab-item>

                      </v-tabs>
                    </v-tab-item>

                  </v-tabs-items>


                </v-card>
              </v-dialog>
            </v-col>
          </v-row>

        </v-col>

      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";


export default {

  name: 'HelloWorld',

  components: {
    draggable,
  },

  methods: {

    setTitle(name, index) {
      this.cards[index].title = name;

    },

    updateStats() {
      (async () => {

        const stat = await axios.get('http://localhost:5000/stats',)

        for (let i = 0; i < stat.data.length; i++) {
          this.chars[i] = {}
          this.chars[i].name = stat.data[i].charName;
          this.chars[i].src = stat.data[i].Image;
          this.chars[i].desc = stat.data[i].title;
          this.chars[i].attributes = {};
          this.chars[i].attributes.element = { title: "Element", val: stat.data[i].Element }
          this.chars[i].attributes.weapon = { title: "Weapon", val: stat.data[i].Region }
          this.chars[i].attributes.region = { title: "Region", val: stat.data[i].Weapon }
          this.chars[i].stats = {}
          this.chars[i].stats.f_val = { title: "Fuck", num: stat.data[i].f_val }
          this.chars[i].stats.m_val = { title: "Marry", num: stat.data[i].m_val }
          this.chars[i].stats.k_val = { title: "Kill", num: stat.data[i].k_val }
        }
      })();

    }
    ,
    printNames() {

      console.log("CHECKED");

      /*      axios.post('http://localhost:5000/submit', {
      
              fuck: this.cards[0].title,
              marry: this.cards[1].title,
              kill: this.cards[2].title
            });
      
      */
      (async () => {

        console.log("Entered Async")

        const res = await axios.get('http://localhost:5000/resp',)

        for (var i = 0; i < res.data.length; i++) {
          this.cards[i].title = "";
          this.cards[i].src = "";
          this.cards[i].title = res.data[i].charName;
          this.cards[i].src = res.data[i].Image;
        }



    this.updateStats();

      }
      )();

    },
  },
    mounted()
  {
    this.updateStats()
  },

    data: () => ({
      navBar: null,
      dialog: false,
      navBarCat:
        [
          "Characters", "Analysis", "Settings"
        ],
      categories:
        [
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
</script>

<style>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>