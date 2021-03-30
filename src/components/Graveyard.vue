<template>
  <div class="graveyard">
    <CardPile
        label="Graveyard"
        :cards="cards"
        :background="background"
        @removeCards="onExile"
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
          return this.cards[0]['imageUrl']
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
  @import "~@/styles/graveyard.sass"
</style>
