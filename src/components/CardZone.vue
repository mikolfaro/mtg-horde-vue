<template>
  <div>
    <div :id="id" class="card-zone">
      <div class="non-tokens">
        <Card
            v-for="(card, index) in nonTokens"
            v-bind:key="index"
            :card="card"
            @destroy="destroyPermanent"
            @tap="tapPermanent"
            @untap="untapPermanent"
        />
      </div>
      <div class="tokens">
        <Card
            v-for="(card, index) in tokens"
            v-bind:key="index"
            :card="card"
            @destroy="destroyPermanent"
            @tap="tapPermanent"
            @untap="untapPermanent"
        />
      </div>
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
      ...mapState(['board']),
      nonTokens() {
        return this.board.permanents.filter((card) => {
          return !card.isToken()
        })
      },
      tokens() {
        return this.board.permanents.filter((card) => {
          return card.isToken()
        })
      }
    },
    methods: {
      ...mapActions(['tapPermanent', 'untapPermanent', 'destroyPermanent'])
    }
  }
</script>
<style lang="sass">
  .card-zone
    display: flex
    flex-direction: column

    .tokens, .non-tokens
      display: flex
      flex-direction: row
      flex-wrap: wrap

      margin: 15px
      margin-top: 50px

      .card
        margin-left: 10px
        margin-right: 10px
</style>
