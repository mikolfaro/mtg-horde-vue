<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <PhaseTracker />
        </div>
        <div class="col-3"></div>
        <div class="col-1">
          <Hand
              class="mt-2"
              :cards="hand.cards"
              @draw="draw"
              @discard="discardCard"
              @discard-random="discardRandom"
              @exile="exileFromHand"
              @play="play"
          />
          <TokenCreator
              class="mt-2"
              :tokenDefaultData="spawnableToken"
              @spawn-token="spawnToken"></TokenCreator>
        </div>
        <div class="col-2">
          <Deck
              :cards="deck.cards"
              @discard="discardCardFromDeck"
              @exile="exileFromDeck"
              @mill="millDeck"
              @play="playFromDeck"
          />
        </div>
        <div class="col-2">
          <Graveyard
              :cards="board.graveyard"
              @exile="exileFromGraveyard"
              @play="playFromGraveyard"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <CardZone id="board"></CardZone>
    </div>

    <SpellModal
      :spell="topStack"
      @resolve-spell="resolveTopStack"
      @counter-spell="counterTopStack"
    />
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  import CardZone from '@/components/CardZone'
  import Deck from '@/components/Deck.vue'
  import Graveyard from '@/components/Graveyard.vue'
  import Hand from '@/components/Hand.vue'
  import PhaseTracker from '@/components/PhaseTracker.vue'
  import TokenCreator from '@/components/TokenCreator.vue'
  import SpellModal from '@/components/SpellModal'

  export default {
    name: "HordeGame",
    components: { SpellModal, CardZone, Deck, Graveyard, Hand, PhaseTracker, TokenCreator },
    data() {
      return {}
    },
    computed: {
      ...mapState(['deck', 'hand', 'graveyard', 'exile', 'board', 'stack', 'spawnableToken']),
      topStack() {
        if (this.board.stack.length) {
          return this.board.stack[0]
        }
        return null
      }
    },
    mounted() {
      if (!this.deck.cards.length) {
        this.$router.push({ name: 'Home' })
      }
    },
    methods: {
      ...mapActions([
        'resolveSpell', 'counterSpell', 'millDeck', 'spawnToken',
        'draw', 'exileFromHand', 'discardRandom', 'discardCard',
        'discardCardFromDeck', 'exileFromDeck', 'playFromDeck',
        'exileFromGraveyard', 'play', 'playFromGraveyard',
      ]),
      resolveTopStack(spell) {
        this.resolveSpell(spell)
      },
      counterTopStack(spell) {
        this.counterSpell(spell)
      },
    }
  }
</script>
