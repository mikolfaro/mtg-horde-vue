<template>
  <div class="graveyard">
    <CardPile
        label="Graveyard"
        :cards="cards"
        :background="background"
        remove-card-label="Exile"
        @remove-cards="onExile"
    />
  </div>
</template>
<script>
  import CardPile from '@/components/CardPile'
  export default {
    name: 'Graveyard',
    components: { CardPile },
    data() {
      return {}
    },
    props: {
      cards: { type: Array }
    },
    computed: {
      background: function () {
        if (this.cards.length > 0) {
          return this.cards[this.cards.length - 1].imageUrl()
        } else {
          return null;
        }
      }
    },
    methods: {
      onExile() {
        console.log('onExile')
      }
    },
  }
</script>
<style lang="sass">
  .graveyard
    width: 100%
    height: 100%
</style>
