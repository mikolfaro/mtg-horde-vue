<template>
  <div class="home">
    <h1>Horde Magic</h1>

    <GameForm @play="onPlay" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import deckData from '../decks'
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
      this.loadDeck(e.deckName)
      this.setPlayersCount(e.playersCount)
      this.setGraveyardTokens(e.graveyardTokens)
      this.$router.push({ name: "Game" })
    },
    loadDeck(deckName) {
      if (deckData[deckName]) {
        const cards = deckData[deckName]['deckList'].map((cardData, i) => {
          return Card.createFromCardData(cardData, i)
        })

        this.setDeck(shuffle(cards))
        this.setSpawnableToken(deckData[deckName]['spawnableToken'])
      }
    },
    ...mapActions(['setDeck', 'setPlayersCount', 'setGraveyardTokens', 'setSpawnableToken'])
  },
}
</script>
