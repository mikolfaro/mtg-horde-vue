<template>
  <div class="deck" >
    <CardPile
        label="Deck"
        remove-card-label="Mill"
        :cards=cards
        :background="background"
        :actions="actions"
        @discard="onDiscard"
        @exile="onExile"
        @play="onPlay"
        @remove-cards="onMill">
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
        actions: {
          discard: 'Discard',
          exile: 'Exile',
          play: 'Play',
        }
      }
    },
    props: {
      cards: { type: Array }
    },
    methods: {
      onMill(count) {
        this.$emit("mill", count)
      },
      onDiscard(card) {
        this.$emit('discard', card)
      },
      onExile(card) {
        this.$emit('exile', card)
      },
      onPlay(card) {
        console.log('play')
        this.$emit('play', card)
      },
    }
  }
</script>
<style lang="sass">
  .graveyard
    width: 100%
    height: 100%
</style>
