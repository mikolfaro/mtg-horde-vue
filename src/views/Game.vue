<template>
  <div class="game-page">
    <PhaseTracker :phase="phase"></PhaseTracker>

    <Graveyard :cards="graveyard"></Graveyard>

    <deck :cards="deck"></deck>

    <hand :cards="hand"></hand>

    <token-creator></token-creator>

    <board-wipe></board-wipe>

    <card-zone></card-zone>

    <card-modal></card-modal>

    <list-modal></list-modal>
  </div>
</template>
<script>
  import PhaseTracker from '@components/PhaseTracker.vue'

  export default {
    name: "Game",
    components: { PhaseTracker },
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
