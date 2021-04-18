<template>
  <div class="deck" >
    <CardPile
        :label="$t('deck.title')"
        :remove-card-label="$t('deck.millButton')"
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
