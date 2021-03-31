<template>
  <div class="phase-tracker">
    <div class="current-phase-title">
      <span class="current-phase-label">Phase:</span>
      &nbsp;
      <span class="current-phase">{{phase.title}}</span>
    </div>

    <span class="current-phase-description">{{phase.description}}</span>

    <div class="button-container">
      <button class="button-small" @click="onNextPhase">Next</button>
    </div>
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
  .phase-tracker
    padding: 10px

    background-color: rgba($color-black, 0.5)
    color: white
    border: 1px solid black
    border-radius: 10px

    .current-phase-title
      font-size: 1.7em

    .current-phase-description
      font-size: 0.8em
      display: block

    .button-container
      text-align: right
</style>
