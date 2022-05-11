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
  <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
        </template>
  
        <v-card>
         <v-toolbar
        flat
        color="primary"
        dark
      >
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
       <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
  
        <v-tab href="#tab-1">
          Characters
          <v-icon>mdi-phone</v-icon>
        </v-tab>
  
        <v-tab href="#tab-2">
          Analysis
          <v-icon>mdi-heart</v-icon>
        </v-tab>
  
        <v-tab href="#tab-3">
          Settings
          <v-icon>mdi-account-box</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          Option 1
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          Option 2
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-access-point
          </v-icon>
          Option 3
        </v-tab>
  
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>
  
              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
              </p>
  
              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
              </p>
  
              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
              </p>
  
              <p>
                Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
              </p>
  
              <p>
                Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
              </p>
  
              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>
  
              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
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