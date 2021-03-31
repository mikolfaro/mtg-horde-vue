<template>
  <div>
    <div :id="id" class="card-zone">
      <Card
          v-for="(card, index) in board"
          v-bind:key="index"
          :card="card"
          @destroy="destroyPermanent"
      />
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'

  import Card from '@/components/Card'

  export default {
    name: "CardZone",
    components: { Card },
    data() {
      return {}
    },
    props: {
      id: { type: String, },
    },
    computed: {
      ...mapState(['board'])
    },
    methods: {
      ...mapActions(['tapPermanent', 'untapPermanent', 'destroyPermanent'])
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/card-zone"
</style>
