<template>
  <form v-on:submit="handleSubmit">
    <div class="mt-3 form-group">
      <label for="players">{{ $t("gameForm.players.label") }}</label>
      <input class="form-control" id="players" name="players" type="number" min="1" max="6"
             v-model="players" @change="handleInputChange">
    </div>
    <div class="mt-3 form-group">
        <label for="deck">{{ $t("gameForm.deck.label") }}</label>
        <select class="form-control" id="deck" name="deck"
                v-model="deck" @change="handleInputChange">
          <option v-for="aDeck in decks"
                  v-bind:value="aDeck"
                  v-bind:key="aDeck.name">
            {{ aDeck.name }} - {{ aDeck.deckList.length }}
          </option>
        </select>
    </div>

    <div class="mt-3 form-group">
      <label class="checkbox">
        <input id="graveyardTokens" name="graveyardTokens" type="checkbox"
               v-model="graveyardTokens" @change="handleInputChange">

        <span class="label">{{ $t("gameForm.graveyardTokens.label") }}</span>
     </label>
    </div>

    <div class="mt-3">
      <input class="button button-primary" type="submit" :value="$t('gameForm.submit')"/>
    </div>
  </form>
</template>
<script>
  import decks from '@/decks'

  export default {
    name: "HordeGameForm",
    data() {
      return {
        decks: decks,
        players: 4,
        deck: 'zombie200',
        graveyardTokens: false
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        this.$emit("play", {
          deck: this.deck,
          playersCount: this.players,
          graveyardTokens: this.graveyardTokens
        })
      },
      handleInputChange() {

      }
    }
  }
</script>

<style lang="sass" scoped>
  select, input
    margin: 0
</style>
