<template>
  <div class="game-page">
    <PhaseTracker />

    <Graveyard :cards="graveyard"></Graveyard>

    <Deck :cards="deck"></Deck>

    <Hand :cards="hand"></Hand>

    <TokenCreator></TokenCreator>

    <BoardWipe></BoardWipe>

    <CardZone id="board"></CardZone>

    <SpellModal v-if="effects.length > 0" :spell="effects[0]"></SpellModal>

    <!-- card-modal></card-modal -->

    <!-- list-modal></list-modal -->
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  import BoardWipe from '@/components/BoardWipe'
  import CardZone from '@/components/CardZone'
  import Deck from '@/components/Deck.vue'
  import Graveyard from '@/components/Graveyard.vue'
  import Hand from '@/components/Hand.vue'
  import PhaseTracker from '@/components/PhaseTracker.vue'
  import TokenCreator from '@/components/TokenCreator.vue'
  import SpellModal from '@/components/SpellModal'

  export default {
    name: "Game",
    components: { SpellModal, BoardWipe, CardZone, Deck, Graveyard, Hand, PhaseTracker, TokenCreator },
    data() {
      return {}
    },
    computed: {
      ...mapState(['phase', 'deck', 'hand', 'graveyard', 'exile', 'board', 'effects'])
    },
    mounted() {
      if (!this.deck) {
        this.$router.push('home')
      }
    }
  }
</script>
