

<template>
  <v-app>
      <HelloWorld/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
  methods: {
    handleDragEnd() {
      this.futureItem = this.cards[this.futureIndex];
      this.movingItem = this.cards[this.movingIndex];
      const _items = Object.assign([], this.cards);
      _items[this.futureIndex] = this.movingItem;
      _items[this.movingIndex] = this.futureItem;
      console.log("HELP")

      this.cards = _items;
    },
    handleMove(e) {
      const { index, futureIndex } = e.draggedContext;
      this.movingIndex = index;
      this.futureIndex = futureIndex;
      console.log("HELP")
      return false; // disable sort
    }
  }
};
</script>
