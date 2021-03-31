<template>
  <div class="deck" >
    <CardPile
        label="Deck"
        :cards=cards
        :background="background"
        @removeCards="mill"
        removeCardLabel="Mill cards">
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
      mill(count) {
        this.$emit("mill", count)
      },
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/deck"
</style>
