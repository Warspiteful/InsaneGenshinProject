<template>
  <v-app>
    <v-toolbar app color="primary" dark>
      <h1>Genshin Fuck Marry Kill</h1>
    </v-toolbar>
    <v-container fluid>

      <v-row align="center" justify="center">

        <v-col cols="4" align="center" justify="center" v-for="cat in categories" :key="cat">
          <h1>{{ cat }}</h1>
        </v-col>
      </v-row>
      <draggable v-model="cards">
        <TransitionGroup class="row" name="list">
          <v-col name="list" v-for="card in cards" :key="card.title" :cols="4" align="center" justify="center">

            <v-card elevation="5" width="55%" height="auto" key="card.title">

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
            </v-col>
            <v-col cols="12" sm="4" order-sm="first" @click="submitRound">
              <v-btn>Submit</v-btn>

            </v-col>
            <v-col cols="12" sm="4">
              <v-dialog v-model="dialog" width="47%" height="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" @click="updateStats">
                    Statistics
                  </v-btn>
                </template>

                <v-card width="auto">
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
                      <v-tabs vertical height="800px" center-active>
                        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                        <v-tab style="max-width:180px;" left v-for="char in chars" :key="char.name">
                          {{ char.name }}
                        </v-tab>

                        <v-tab-item v-for="char in chars" :key="char.name" eager>

                          <v-card flat>
                            <v-list-item>
                              <v-list-item-content color="grey">
                                <v-img style="max-width:180px;" :eager="true" :src="char.src" class="white--text align-end"></v-img>
                              </v-list-item-content>
                              <v-list-item-content>
                                <v-card-text class="text-center">
                                  <v-row>
                                    <v-col cols="12">
                                      <h1>{{ char.name }}</h1>
                                      <h4>{{ char.desc }}</h4>
                                      <hr>

                                    </v-col>

                                    <v-col cols="4" v-for="stat in char.stats" :key="stat.key">
                                      <h2>{{ stat.title }}</h2>
                                      <h3>{{ stat.num }}%</h3>
                                      <hr>

                                    </v-col>

                                    <v-col cols="4" v-for="attr in char.attributes" :key="attr.key">
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

                      </v-tabs>
                    </v-tab-item>


                    <v-tab-item key="1">
                      <v-tabs v-model="statBar" vertical fixed-tabs>

                        <v-tab v-for="attri in attr" :key="attri.title">
                          {{ attri.title }}
                        </v-tab>

                        <v-tabs-items v-model="statBar">
                          <v-tab-item v-for="attri in attr" :key="attri.title">
                            <v-card flat>

                              <v-card-text>
                                <v-row class="stretch" align="center">

                                  <v-col cols="4" v-for="stat in attri" :key="stat.title">


                                    <h1>{{ stat.title }}</h1>

                                    <span v-for="(at) in stat.val" :key="at.title">
                                      <h2>{{ at.title }}:{{ at.percent }}% - {{ at.total }}</h2>
                                    </span>

                                  </v-col>

                                </v-row>

                              </v-card-text>

                            </v-card>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-tabs>

                    </v-tab-item>

                    <v-tab-item key="2">
                      <v-tabs vertical fixed-tabs>
                        <v-tab>
                          Credits
                        </v-tab>


                        <v-tab-item>
                          <v-card flat>
                            <v-card-text>
                              Created by <a href="https://twitter.com/warspiteful">Warspiteful</a>
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
</style>