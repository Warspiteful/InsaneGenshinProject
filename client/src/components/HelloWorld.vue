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
              <v-dialog v-model="dialog" width="45%">
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
        console.log("Finished Processing")
        console.log(res.data.character)
        this.cards[0].title = res.data.character;
        this.cards[0].src = res.data.img;

      }
      )();

    }
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
    chars: [
      { name: 'Arataki Itto', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Albedo_Card_irlhqz.webp', desc: "Chief Alchemist of the Knights of Favonius", attributes: [{ title: "Element", val: "Geo" }, { title: "Weapon", val: "Sword" }, { title: "Region", val: "Mondstadt" }], stats: [{ title: "Fuck", num: "4" }, { title: "Marry", num: "2" }, { title: "Kill", num: "3" }] },
      { name: 'Raiden Shogun', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144525/genshin-cards/Character_Raiden_Shogun_Card_zx1vyj.webp', desc: "Chief Alchemist of the Knights of Favonius", attributes: [{ title: "Element", val: "Electro" }, { title: "Weapon", val: "Polearm" }, { title: "Region", val: "Inazuma" }], stats: [{ title: "Fuck", num: "4" }, { title: "Marry", num: "2" }, { title: "Kill", num: "3" }] },
      { name: 'Keqing', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144524/genshin-cards/Character_Keqing_Card_qij7o8.webp', desc: "Chief Alchemist of the Knights of Favonius", attributes: [{ title: "Element", val: "Electro" }, { title: "Weapon", val: "Polearm" }, { title: "Region", val: "Inazuma" }], stats: [{ title: "Fuck", num: "4" }, { title: "Marry", num: "2" }, { title: "Kill", num: "3" }] },

      { name: 'Kaedahara Kazuha', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144524/genshin-cards/Character_Jean_Card_pkkijg.webp', flex: 4 },
      { name: 'Ganyu', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Ganyu_Card_bsvedg.webp', flex: 4 },
    ]
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