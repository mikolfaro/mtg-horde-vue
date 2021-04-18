<template>
  <div class="graveyard">
    <CardPile
        :label="$t('graveyard.title')"
        :cards="cards"
        :background="background"
        :actions="actions"
        @exile="onExile"
        @play="onPlay"
        @shuffle-in-deck="onShuffleInDeck"
    />
  </div>
</template>
<script>
  import CardPile from '@/components/CardPile'
  export default {
    name: 'Graveyard',
    components: { CardPile },
    data() {
      return {
        actions: {
          exile: this.$t("actions.exile"),
          play: this.$t("actions.play"),
        },
      }
    },
    props: {
      cards: { type: Array }
    },
    computed: {
      background: function () {
        if (this.cards.length > 0) {
          return this.cards[0].imageUrl()
        } else {
          return null;
        }
      }
    },
    methods: {
      onExile(card) {
        this.$emit('exile', card)
      },
      onPlay(card) {
        this.$emit("play", card)
      },
      onShuffleInDeck(card) {
        this.$emit("shuffle-in-deck", card)
      }
    },
  }
</script>
<style lang="sass">
  .graveyard
    width: 100%
    height: 100%
</style>
