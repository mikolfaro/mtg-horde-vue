<template>
  <div>
    <div :id="id" class="card-zone">
      <Card
          v-for="(card, index) in cards"
          v-bind:key="index"
          :image-url="card.cardData.imageUrl"
          :tapped="card.tapped"
          :faceDown="card.faceDown"
      />
    </div>
  </div>
</template>
<script>
  import Card from '@/components/Card'

  export default {
    name: "CardZone",
    components: { Card },
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
