<template>
  <div class="deck" >
    <CardPile
        label="Deck"
        :cards=cards
        :background="background"
        @removeCard=onDiscard
        removeCardText="Discard">
    </CardPile>
  </div>
</template>
<script>
  import CardPile from '@/components/CardPile'
  import backCard from '@/assets/back-card.png'

  export default {
    name: 'Deck',
    components: { CardPile },
    data() {
      return {
        background: backCard,
      }
    },
    props: {
      cards: { type: Array }
    },
    methods: {
      onDiscard() {
        console.log("Discard")
      },
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/deck"
</style>
