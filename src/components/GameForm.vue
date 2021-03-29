<template>
  <div class="game-form">
    <div class="outer-box">
      <form v-on:submit="handleSubmit">
        <table>
          <tbody>
          <tr>
            <td class="label">
              <label for="players"># of Players (Max 6):</label>
            </td>
            <td class="input">
              <input id="players" name="players" type="number" min="1" max="6"
                     v-model="players" @change="handleInputChange">
            </td>
          </tr>
          <tr>
            <td class="label">
              <label for="deck">Deck:</label>
            </td>
            <td class="input">
              <select id="deck" name="deck"
                      v-model="deck" @change="handleInputChange">
                <option value="zombie200">Zombies - 200</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="label">
              <label for="graveyardTokens">Destroyed tokens go to graveyard</label>
            </td>
            <td class="input">
              <input id="graveyardTokens" name="graveyardTokens" type="checkbox"
                     v-model="graveyardTokens" @change="handleInputChange">
            </td>
          </tr>
          </tbody>
        </table>
        <input class="submit" type="submit" value="Play!"/>
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

        this.$router.push('game')
      },
      handleInputChange() {

      }
    }
  }
</script>

<style lang="sass">
  @import "~@/styles/game-form"
</style>
