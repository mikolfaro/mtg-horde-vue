<template>
  <div class="hand">
    <div class="hand-size">{{cards.length}}</div>
    <button class="hand-button" @click="onDiscard">-</button>
    <button class="hand-button" @click="onDraw">+</button>
  </div>
</template>
<script>
  export default {
    name: 'Hand',
    props: {
      cards: { type: Array }
    },
    data() {
      return {}
    },
    methods: {
      onDiscard() {
        console.log("Discard")
      },
      onDraw() {
        console.log("Draw")
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/hand.sass"
</style>
