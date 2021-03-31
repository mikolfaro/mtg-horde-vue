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
        this.$emit("discard")
      },
      onDraw() {
        this.$emit("draw")
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/hand.sass"
</style>
