<template>
  <div>
    <div :id="id" class="card-zone">
      <div class="non-tokens">
        <div class="left">
          <Card
              class="bigger-card"
              v-for="(card, index) in creatures"
              v-bind:key="index"
              :card="card"
              :can-tap="true" :can-destroy="true"
              @destroy="destroyPermanent"
              @tap="tapPermanent"
              @untap="untapPermanent"
          />
        </div>
        <div class="right">
          <Card
              class="bigger-card"
              v-for="(card, index) in nonCreatures"
              v-bind:key="index"
              :card="card"
              :can-tap="true" :can-destroy="true"
              @destroy="destroyPermanent"
              @tap="tapPermanent"
              @untap="untapPermanent"
          />
        </div>
      </div>
      <div class="tokens">
        <Card
            v-for="(card, index) in tokens"
            v-bind:key="index"
            :card="card"
            :can-tap="true" :can-destroy="true"
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
      creatures() {
        return this.board.permanents.filter(function (card) {
          return !card.isToken() && card.isCreature()
        })
      },
      nonCreatures() {
        return this.board.permanents.filter(function (card) {
          return !card.isToken() && !card.isCreature()
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

    .tokens, .non-tokens, .left, .right
      display: flex
      flex-direction: row
      flex-wrap: wrap

      margin: 15px
      margin-top: 20px

      .card
        margin-left: 10px
        margin-right: 10px
        margin-top: 10px

    .non-tokens
      justify-content: space-between
      margin: 0

  .bigger-card
    .card-bounds
      width: 126px * 1.3
      height: 176px * 1.3
</style>
