<template>
  <div class="phase-tracker">
    <div class="current-phase-title">
      <span class="current-phase-label">Phase:</span>
      <span class="current-phase">{{phase.title}}</span>
    </div>

    <span class="current-phase-description">{{phase.description}}</span>
    <button class="next-phase-btn" @click="onNextPhase">Next</button>
  </div>
</template>

<script>
  export default {
    name: 'PhaseTracker',
    props: {
      phase: { type: Object, required: true }
    },
    data() {
      return {}
    },
    methods: {
      onNextPhase() {

      }
    }
  }
</script>

<style lang="sass">
  @import "~@/styles/phase-tracker"
</style>
