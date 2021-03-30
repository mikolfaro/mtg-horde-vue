<template>
  <div class="game-page">
    <PhaseTracker :phase="phase"></PhaseTracker>

    <Graveyard :cards="graveyard"></Graveyard>

    <Deck :cards="deck"></Deck>

    <Hand :cards="hand"></Hand>

    <TokenCreator></TokenCreator>

    <BoardWipe></BoardWipe>

    <CardZone></CardZone>

    <!-- card-modal></card-modal -->

    <!-- list-modal></list-modal -->
  </div>
</template>
<script>
  import BoardWipe from '@/components/BoardWipe'
  import CardZone from '@/components/CardZone'
  import Deck from '@/components/Deck.vue'
  import Graveyard from '@/components/Graveyard.vue'
  import Hand from '@/components/Hand.vue'
  import PhaseTracker from '@/components/PhaseTracker.vue'
  import TokenCreator from '@/components/TokenCreator.vue'

  export default {
    name: "Game",
    components: { BoardWipe, CardZone, Deck, Graveyard, Hand, PhaseTracker, TokenCreator },
    data() {
      return {
        phase: "",
        deck: "",
        graveyard: [],
        exileCards: [],
      }
    }
  }
</script>
