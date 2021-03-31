<template>
  <div class="card" :class="{ tapped: tapped }">
    <div class="card-bounds">
      <img :src=image :alt="name" @click=onCardClick />
      <span v-if="card.isCreature()" class="pt-indicator">{{power}}/{{toughness}}</span>
    </div>
    <button v-if="!card.tapped" class="tap-card" @click=onTap>
      <img alt="Tap card" :src="tapIcon" role="presentation" />
    </button>
    <button v-else class="untap-card" @click="onUntap">
      <img alt="Untap card" :src="untapIcon" role="presentation" />
    </button>
    <button class="destroy-card" @click="onDestroy">
      <img alt="Destroy card" :src="destroyIcon" role="presentation" />
    </button>
  </div>
</template>
<script>
  import faceDownImage from '@/assets/back-card.png'
  import destroyIcon from '@/assets/destroy-icon.png'
  import tapIcon from '@/assets/tap-icon.png'
  import untapIcon from '@/assets/untap-icon.png'
  import Card from '@/models/Card'

  export default {
    name: 'Card',
    data() {
      return {
        destroyIcon: destroyIcon,
        tapIcon: tapIcon,
        untapIcon: untapIcon,
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
        this.$emit("tap", this.card)
      },
      onDestroy() {
        this.$emit("destroy", this.card)
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/card"
</style>
