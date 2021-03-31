<template>
  <div class="hand">
    <div class="hand-size">{{cards.length}}</div>
    <button class="button-small" @click="onDraw">+</button>
    <button class="button-small" @click="onDiscard">-</button>
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
  .hand-size
    width: 64px
    height: 64px
    text-align: center
    line-height: 64px
    color: white
    font-size: 2em
    background-image: url('~@/assets/hand-mtg.png')

  .hand .button-small
    width: 50%
</style>
