
<template>
  <v-app>
    <v-app-bar app color="primary" dark v-resize="onResize">
      <v-row>
        <v-col class="mobile-text" cols="12">
          <h1>Genshin Fuck Marry Kill</h1>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content class="background">
      <v-container fluid>

        <v-row align="center" justify="center">

          <v-col cols="4" align="center" justify="center" v-for="cat in categories" :key="cat">
            <h1>{{ cat }}</h1>
          </v-col>
        </v-row>
        <draggable v-model="cards">
          <TransitionGroup class="row" name="list">
            <v-col name="list" v-for="card in cards" :key="card.title" :cols="4" align="center" justify="center">

              <v-card style="padding: 10px 10px;" dark elevation="7" width="55%" height="auto" key="card.title">

                <v-img :src="card.src" center class="white--text align-end">
                </v-img>
              </v-card>

            </v-col>
          </TransitionGroup>
        </draggable>
      </v-container>

      <v-container fluid>
        <v-row class="text-center" align-center>


          <v-col cols="12">
            <v-row>
              <v-col cols="12" order-sm="first" order="last" sm="4">
              </v-col>
              <v-col cols="12" sm="4" @click="submitRound">
                <v-img width="10%" contain src="../assets/Stamp.png"></v-img>
              </v-col>
              <v-col cols="12" sm="4" flex>
                <v-dialog v-model="dialog" width="44%" height="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="text-xs-center">
                      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" @click="updateStats">
                        Statistics
                      </v-btn>
                    </div>
                  </template>

                  <v-card width="auto">
                    <v-toolbar flat color="primary" dark>
                      <v-toolbar-title>User Profile</v-toolbar-title>
                    </v-toolbar>



                    <div class="d-none d-sm-flex">
                      <v-tabs v-model="navBar" background-color="deep-purple accent-4" centered fluid dark
                        icons-and-text>
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab v-for="(cat, index) in navBarCat" :key="index">
                          {{ cat }}
                        </v-tab>

                      </v-tabs>
                    </div>

                    <v-menu class="d-flex d-sm-none" bottom center>
                      <template v-slot:activator="{ on }">
                        <div align="center">
                          <v-btn text class="d-flex d-sm-none" v-on="on">
                            Category Select
                            <v-icon right>mdi-menu-down</v-icon>
                          </v-btn>
                        </div>
                      </template>

                      <v-list style="max-height: 300px" class="overflow-y-auto  grey lighten-3">
                        <v-list-item v-for="(cat, index) in navBarCat" :key="index">
                          <v-list-item-title @click="navBar = index">{{ cat }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>



                    <v-tabs-items v-model="navBar">
                      <v-tab-item key="0">

                        <v-tabs v-model="charsBar" class="d-none d-sm-flex" center-active>
                          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                          <v-tab left v-for="char in chars" :key="char.name">
                            {{ char.name }}
                          </v-tab>
                        </v-tabs>

                        <v-menu class="d-flex d-sm-none" bottom center>
                          <template v-slot:activator="{ on }">
                            <div align="center">
                              <v-btn text class="d-flex d-sm-none align-self-center" v-on="on">
                                Character Select
                                <v-icon right>mdi-menu-down</v-icon>
                              </v-btn>
                            </div>
                          </template>

                          <v-list style="max-height: 300px" class="overflow-y-auto  grey lighten-3">
                            <v-list-item v-for="(item, index) in chars" :key="item.name">
                              <v-list-item-title @click="charsBar = index">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-tabs-items v-model="charsBar" eager>
                          <v-tab-item v-for="char in chars" :key="char.name">
                            <v-card flat>
                              <v-list-item>
                                <v-list-item-content eager class="d-none d-lg-flex" color="grey">
                                  <v-img eager contain max-height="400" :src="char.src" class="white--text align-end">
                                  </v-img>
                                </v-list-item-content>

                                <v-list-item-content eager>


                                  <v-card-text class="text-center">
                                    <v-row>
                                      <v-col>
                                        <v-img contain max-height="400" eager :src="char.src"
                                          class="d-flex d-lg-none white--text align-end"></v-img>
                                      </v-col>

                                      <v-col cols="12">
                                        <h1>{{ char.name }}</h1>
                                        <hr>
                                      </v-col>
                                      <v-col cols="12">
                                        <h4>{{ char.desc }}</h4>
                                        <hr>
                                      </v-col>

                                      <v-col cols="12" lg="4" v-for="(stat, name, index) in char.stats" :key="stat.key">

                                        <h2>{{ categories[index] }}</h2>
                                        <h3>{{ stat.num }}%</h3>
                                        <hr>
                                      </v-col>
                                      <v-col cols="12" lg="4" v-for="attr in char.attributes" :key="attr.key">
                                        <h2>{{ attr.title }}</h2>
                                        <h4>{{ attr.val }}</h4>
                                        <hr>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-list-item-content>
                              </v-list-item>

                            </v-card>
                          </v-tab-item>
                        </v-tabs-items>

                      </v-tab-item>



                      <v-tab-item key="1">

                        <v-menu class="d-flex d-sm-none" bottom center>
                          <template v-slot:activator="{ on }">
                            <div align="center">
                              <v-btn text class="d-flex d-sm-none align-self-center" v-on="on">
                                Analysis Selection
                                <v-icon right>mdi-menu-down</v-icon>
                              </v-btn>
                            </div>
                          </template>

                          <v-list style="max-height: 300px" class="overflow-y-auto  grey lighten-3">
                            <v-list-item v-for="(item, index) in attr" :key="item.name">
                              <v-list-item-title @click="statBar = index">{{ item.title }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-row>
                          <v-col class="d-none d-sm-flex" :cols="2">
                            <v-tabs v-model="statBar" vertical fixed-tabs>
                              <v-tabs-slider></v-tabs-slider>

                              <v-tab v-for="attri in attr" :key="attri.title">
                                {{ attri.title }}
                              </v-tab>
                            </v-tabs>

                          </v-col>
                          <v-col :cols="12" sm="10">
                            <v-tabs-items v-model="statBar">
                              <v-tab-item v-for="attri in attr" :key="attri.title">
                                <v-card flat>
                                  <v-card-text>
                                    <v-row class="stretch" align="center">
                                      <v-col cols="12" sm="4" v-for="stat in attri" :key="stat.title">
                                        <h1>{{ stat.title }}</h1>
                                        <span v-for="(at, index) in stat.val" :key="at.title">
                                          <h2>{{ categories[index] }}:{{ at.percent }}%</h2>
                                        </span>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-tab-item>
                            </v-tabs-items>
                          </v-col>
                        </v-row>

                      </v-tab-item>

                      <v-tab-item key="2">

                        <v-menu class="d-flex d-sm-none" bottom center>
                          <template v-slot:activator="{ on }">
                            <div align="center">
                              <v-btn text class="d-flex d-sm-none align-self-center" v-on="on">
                                Miscelleanous Selection
                                <v-icon right>mdi-menu-down</v-icon>
                              </v-btn>
                            </div>
                          </template>

                          <v-list style="max-height: 300px" class="overflow-y-auto  grey lighten-3">
                            <v-list-item v-for="(item, index) in miscCat" :key="item.name">
                              <v-list-item-title @click="miscBar = index">{{ item }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-row>
                          <v-col cols="2" class="d-none d-sm-flex">
                            <v-tabs v-model="miscBar" vertical fixed-tabs>
                              <v-tab v-for="(cat, index) in miscCat" :key="index">
                                {{ cat }}
                              </v-tab>
                            </v-tabs>
                          </v-col>

                          <v-col cols="10">
                            <v-tabs-items v-model="miscBar">
                              <v-tab-item key="0">
                                <v-card flat>
                                  <v-card-text>
                                    Created by <a href="https://twitter.com/warspiteful">Warspiteful</a>
                                  </v-card-text>
                                </v-card>
                              </v-tab-item>

                              <v-tab-item key="1">
                                <v-card flat>
                                  <v-card-text>
                                    <v-row>
                                      <div v-for="item, label in attr" :key="label">
                                        {{ label }}
                                        <v-col cols="12" sm="4" md="4">

                                          <v-checkbox v-model="filter" v-for="element, keyed in item" :label="keyed"
                                            :value="keyed" :key="keyed"></v-checkbox>
                                        </v-col>

                                      </div>
                                    </v-row>


                                  </v-card-text>
                                </v-card>
                              </v-tab-item>

                              <v-tab-item key="2">
                                <v-card flat>
                                  <v-card-text>
                                    <v-checkbox v-model="adultMode" @click="toggleLabel(adultMode)" label="Adult Mode">
                                    </v-checkbox>
                                  </v-card-text>
                                </v-card>
                              </v-tab-item>



                            </v-tabs-items>
                          </v-col>
                        </v-row>

                      </v-tab-item>

                    </v-tabs-items>


                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>

          </v-col>

        </v-row>

      </v-container>
    </v-content>
  </v-app>
</template>
 <script src="./controller.js" ></script>


<style>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}



/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.mobile-text {
  text-align: left !important;
}

@media (max-width: 600px) {
  .mobile-text {
    text-align: center !important;
  }
}

.background {

  background-image: url("../assets/WoodGrain.png");
  background-repeat: round round;

}
</style>
