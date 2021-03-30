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
      console.log("Start game", e.deckName, e.playersCount, e.graveyardTokens)
      this.loadDeck(e.deckName)

      this.$router.push("game")
    },
    loadDeck(deckName) {
      if (deckData[deckName]) {
        const cards = deckData[deckName].map((cardData, i) => {
          return Card.freshFromData(cardData, i)
        })

        this.setDeck(shuffle(cards))
      }
    },
    ...mapActions(['setDeck'])
  },
}
</script>
