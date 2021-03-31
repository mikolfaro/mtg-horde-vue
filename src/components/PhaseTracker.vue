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
import { mapActions, mapState } from 'vuex'

  export default {
    name: 'PhaseTracker',
    data() {
      return {}
    },
    computed: {
      ...mapState(['phases']),
      phase() {
        return this.phases.current
      }
    },
    methods: {
      onNextPhase() {
        this.stepPhase()
      },
      ...mapActions(['stepPhase']),
    },
  }
</script>

<style lang="sass">
  @import "~@/styles/phase-tracker"
</style>
