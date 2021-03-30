<template>
  <div>
    <div :id="id" class="card-zone">
      <Card v-for="card in cards"></Card>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CardZone",
    data() {
      return {}
    },
    props: {
      id: { type: String, },
      cards: {
        type: Array
      }
    }
  }
</script>
<style lang="sass">
  @import "~@/styles/card-zone"
</style>
