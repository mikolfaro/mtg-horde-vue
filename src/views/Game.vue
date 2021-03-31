<template>
  <div class="game-page">
    <PhaseTracker />

    <Graveyard :cards="graveyard.cards"></Graveyard>

    <Deck :cards="deck.cards" @mill="millDeck"></Deck>

    <Hand :cards="hand.cards"></Hand>

    <TokenCreator></TokenCreator>

    <BoardWipe></BoardWipe>

    <CardZone id="board"></CardZone>

    <SpellModal
      :spell="topStack"
      @resolveSpell="resoveTopStack"
      @counterSpell="counterTopStack" />

    <!-- card-modal></card-modal -->

    <!-- list-modal></list-modal -->
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  import BoardWipe from '@/components/BoardWipe'
  import CardZone from '@/components/CardZone'
  import Deck from '@/components/Deck.vue'
  import Graveyard from '@/components/Graveyard.vue'
  import Hand from '@/components/Hand.vue'
  import PhaseTracker from '@/components/PhaseTracker.vue'
  import TokenCreator from '@/components/TokenCreator.vue'
  import SpellModal from '@/components/SpellModal'

  export default {
    name: "Game",
    components: { SpellModal, BoardWipe, CardZone, Deck, Graveyard, Hand, PhaseTracker, TokenCreator },
    data() {
      return {}
    },
    computed: {
      ...mapState(['deck', 'hand', 'graveyard', 'exile', 'board', 'stack']),
      topStack() {
        if (this.stack.length) {
          return this.stack[0]
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
      ...mapActions(['resolveSpell', 'counterSpell', 'millDeck']),
      resoveTopStack(spell) {
        this.resolveSpell(spell)
      },
      counterTopStack(spell) {
        this.counterSpell(spell)
      },

    }
  }
</script>
