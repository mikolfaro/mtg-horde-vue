<template>
  <div class="card" :class="{ tapped: tapped }">
    <div class="card-bounds">
      <img :src=image alt="Card" @click=onCardClick />
      <span v-if="power !== null && toughness !== null" class="pt-indicator">{{power}}/{{toughness}}</span>
    </div>
    <button class="tap-card" @click=onTap>
      <img alt="Tap card" :src="tapIcon" role="presentation" />
    </button>
  </div>
</template>
<script>
  import faceDownImage from '@/assets/back-card.png'
  import tapIcon from '@/assets/tap-icon.png'

  export default {
    name: 'Card',
    data() {
      return {
        tapIcon: tapIcon
      }
    },
    props: {
      tapped: {
        type: Boolean,
        default: false
      },
      imageUrl: {
        type: String,
      },
      power: {
        type: String,
        default: null
      },
      toughness: {
        type: String,
        default: null
      }
    },
    computed: {
      image() {
        return this.faceDown ? faceDownImage : this.imageUrl
      },
    },
    methods: {
      onCardClick() {
        return "Card click"
      },
      onTap() {
        return "Tap card"
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/card"
</style>
