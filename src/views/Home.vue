<template>
  <div class="home">
    <h1>Horde Magic</h1>

    <GameForm @play="onPlay" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '@/models/Card'
import GameForm from '@/components/GameForm.vue'
import { shuffle } from '../helpers'

export default {
  name: 'Home',
  components: {
    GameForm
  },
  methods: {
    onPlay(e) {
      this.loadDeck(e.deck)
      this.setPlayersCount(e.playersCount)
      this.setGraveyardTokens(e.graveyardTokens)
      this.$router.push({ name: "Game" })
    },
    loadDeck(deck) {
      const cards = deck['deckList'].map((cardData, i) => {
        return Card.createFromCardData(cardData, i)
      })

      const spawnableToken = deck['spawnableToken']
      this.resetGame([shuffle(cards), spawnableToken])
    },
    ...mapActions(['resetGame', 'setPlayersCount', 'setGraveyardTokens'])
  },
}
</script>
