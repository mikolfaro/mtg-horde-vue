<template>
  <div class="container game-form">
    <div class="outer-box">
      <h1>MTG Horde</h1>

      <form v-on:submit="handleSubmit">
        <div class="mt-3 form-group">
          <label for="players"># of Players)</label>
          <input class="form-control" id="players" name="players" type="number" min="1" max="6"
                 v-model="players" @change="handleInputChange">
        </div>
        <div class="mt-3 form-group">
            <label for="deck">Deck</label>
            <select class="form-control" id="deck" name="deck"
                    v-model="deck" @change="handleInputChange">
              <option value="zombie200">Zombies - 200</option>
            </select>
        </div>

        <div class="mt-3 form-group">
          <label class="checkbox">
            <input id="graveyardTokens" name="graveyardTokens" type="checkbox"
                   v-model="graveyardTokens" @change="handleInputChange">

            <span class="label">Destroyed tokens go to graveyard</span>
         </label>
        </div>

        <input class="button button-primary" type="submit" value="Play!"/>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GameForm",
    data() {
      return {
        players: 4,
        deck: 'zombie200',
        graveyardTokens: false
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        this.$emit("play", {
          deckName: this.deck,
          playersCount: this.players,
          graveyardTokens: this.graveyardTokens
        })
      },
      handleInputChange() {

      }
    }
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

      form
        max-width: 600px
        margin: auto
</style>
