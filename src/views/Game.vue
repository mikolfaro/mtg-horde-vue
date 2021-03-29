<template>
  <div class="game-page">
    <PhaseTracker :phase="phase"></PhaseTracker>

    <Graveyard :cards="graveyard"></Graveyard>

    <Deck :cards="deck"></Deck>

    <hand :cards="hand"></hand>

    <token-creator></token-creator>

    <board-wipe></board-wipe>

    <card-zone></card-zone>

    <card-modal></card-modal>

    <list-modal></list-modal>
  </div>
</template>
<script>
  import Graveyard from '@/components/Graveyard.vue'
  import PhaseTracker from '@/components/PhaseTracker.vue'

  export default {
    name: "Game",
    components: { PhaseTracker, Graveyard },
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
