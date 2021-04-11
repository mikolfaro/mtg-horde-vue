<template>
  <div class="deck" >
    <CardPile
        label="Deck"
        :cards=cards
        :background="background"
        remove-card-label="Mill"
        @remove-cards="mill">
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
  .graveyard
    width: 100%
    height: 100%
</style>
