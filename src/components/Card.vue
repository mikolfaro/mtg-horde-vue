<template>
  <div class="card" :class="{ tapped: tapped }">
    <div class="card-bounds">
      <img :src=image :alt="name" @click=onCardClick />
      <span v-if="card.isCreature()" class="pt-indicator">{{power}}/{{toughness}}</span>
    </div>
    <button class="tap-card" @click=onTap>
      <img alt="Tap card" :src="tapIcon" role="presentation" />
    </button>
  </div>
</template>
<script>
  import faceDownImage from '@/assets/back-card.png'
  import tapIcon from '@/assets/tap-icon.png'
  import Card from '@/models/Card'

  export default {
    name: 'Card',
    data() {
      return {
        tapIcon: tapIcon
      }
    },
    props: {
      card: { type: Card },
    },
    computed: {
      name() {
        return this.faceDown ? "Face down card" : this.card.name()
      },
      image() {
        return this.faceDown ? faceDownImage : this.card.imageUrl()
      },
      tapped() {
        return this.card.tapped
      },
      faceDown() {
        return this.card.faceDown
      },
      power() {
        console.log('P', this.card, this.card.power())
        return this.card.power()
      },
      toughness() {
        return this.card.toughness()
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
