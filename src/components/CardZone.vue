<template>
  <div>
    <div :id="id" class="card-zone">
      <Card
          v-for="(card, index) in board"
          v-bind:key="index"
          :card="card"
      />
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

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
  }
</script>
<style lang="sass">
  @import "~@/styles/card-zone"
</style>
