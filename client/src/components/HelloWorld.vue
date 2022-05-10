<template>
<v-app>
  <v-container fluid>
  <v-row  align="center" justify="center" >
          
            <v-col cols = "4" align="center" justify="center" v-for="cat in categories" :key="cat">{{cat}}</v-col>
                          </v-row>
              <draggable  v-model="cards">
              <TransitionGroup class="row" name = "list">
 <v-col name="list" v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
             align="center" justify="center" 
          >
          
            <v-card
                      width ="55%"
                height="auto" key = "card.title" >

              <v-img 
                :src="card.src"
                class="white--text align-end"
              >
                  <v-card-title v-text="card.title"></v-card-title>
                </v-img>
                </v-card>

              </v-col>
</TransitionGroup>
                        </draggable>
            </v-container>

<v-container>
    <v-row class="text-center" align-center>

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
                     <v-btn>Submit</v-btn>

      </v-col>
                <v-col cols="4">
                  <v-btn>Get Logs</v-btn>
      </v-col>
      </v-row>
       
      </v-col>
      
    </v-row>
    
  </v-container>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";

  export default {
    
    name: 'HelloWorld',
      components: {
    draggable,
  },

    data: () => ({
      categories:
      [
        "Fuck", "Marry", "Kill"
      ],
      cards: [
      { title: 'Albedo', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Albedo_Card_irlhqz.webp', flex: 4 },
      { title: 'Jean', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144524/genshin-cards/Character_Jean_Card_pkkijg.webp', flex: 4 },
      { title: 'Ganyu', src: 'https://res.cloudinary.com/dmsbtdl3p/image/upload/v1652144523/genshin-cards/Character_Ganyu_Card_bsvedg.webp', flex: 4 },
    ],
    }),
  }
</script>

<style>
.list-move, /* apply transition to moving elements */
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