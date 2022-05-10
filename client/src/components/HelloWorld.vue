<template>
  <v-container>
    <v-row class="text-center">
   <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card class="justify-center">
              <v-img
                :src="card.src"
                class="white--text align-end"
                width ="40%"
                height="auto"
              >
                  <v-card-title v-text="card.title"></v-card-title>
                </v-img>
              </v-card>
          </v-col>

 <v-col
        class="mb-10"
        cols="12"
      >
      </v-col>
            <v-col cols="12">
            <v-row>
             <v-col cols="4">
             Coded By Justin
      </v-col>
                  <v-col cols="4">
                  <v-btn></v-btn>
      </v-col>
                <v-col cols="4">
                  <v-btn></v-btn>
      </v-col>
      </v-row>
       
      </v-col>
      
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      cards: [
      { title: 'Pre-fab homes', src: 'https://static.wikia.nocookie.net/gensin-impact/images/f/f8/Character_Albedo_Card.png/', flex: 4 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 },
    ],
    }),
  }
</script>
