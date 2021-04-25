<template>
  <div class="home">
    <h1>{{ $t('home.title') }}</h1>

    <div class="container game-form">
      <div class="outer-box">
        <select class="game-select" v-model="gameType">
          <option value="">{{ $t("home.gameSelect.emptyOption") }}</option>
          <option value="horde">{{ $t("gameType.horde.title") }}</option>
          <option value="pvpHost">{{ $t("gameType.pvpHost.title") }}</option>
          <option value="pvpGuest">{{ $t("gameType.pvpGuest.title") }}</option>
        </select>

        <HordeGameForm v-if="gameType === 'horde'" @play="onPlayHorde" />
        <PvpHostGameForm v-if="gameType === 'pvpHost'" @play="onPlayPvpHost" />
        <PvpGuestGameForm v-if="gameType === 'pvpGuest'" @play="onPlayPvpGuest" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '@/models/Card'
import HordeGameForm from '@/components/HordeGameForm.vue'
import PvpGuestGameForm from '@/components/PvpGuestGameForm'
import PvpHostGameForm from '@/components/PvpHostGameForm'
import { shuffle } from '@/utils/commons'

export default {
  name: 'Home',
  components: {
    HordeGameForm, PvpGuestGameForm, PvpHostGameForm
  },
  data() {
    return { gameType: "" }
  },
  methods: {
    onPlayHorde(e) {
      this.loadDeck(e.deck)
      this.setPlayersCount(e.playersCount)
      this.setGraveyardTokens(e.graveyardTokens)
      this.$router.push({ name: "HordeGame" })
    },
    onPlayPvpHost(roomId) {
      console.log(roomId)
      this.$router.push({ name: "PvpHostGame", params: { roomId: roomId }})
    },
    onPlayPvpGuest(roomId) {
      console.log(roomId)
      this.$router.push({ name: "PvpGuestGame", params: { roomId: roomId }})
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
<style lang="sass">
  .game-form
    .outer-box
      padding: 2em

      margin-left: auto
      margin-right: auto

      text-align: center

      border: 1px solid black
      border-radius: 10px
      color: white

      background-color: rgba(0, 0, 0, 0.5)

      display: flex
      justify-content: center
      flex-direction: column

      max-width: 400px

      .game-select
        margin: 0
</style>
