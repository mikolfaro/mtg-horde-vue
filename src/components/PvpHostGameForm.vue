<template>
  <form v-on:submit="handleSubmit">
    <div class="mt-3">
      <div class="mt-3 form-group">
        <label for="players">{{ $t("gameForm.players.label") }}</label>
        <input class="form-control" id="players" name="players" type="number" min="2" max="4"
               v-model="players">
      </div>
      <div class="mt-3 form-group">
        <label for="playerName">{{ $t("gameForm.playerName.label") }}</label>
        <input class="form-control" id="playerName" name="playerName" type="text"
               v-model="playerName" @change="handlePlayerNameChange"
        />
      </div>
      <input
          class="button button-primary"
          type="submit"
          :value="$t('gameForm.submit')"
      />
    </div>
  </form>
</template>
<script>
export default {
  name: "PvpHostGameForm",
  data() {
    return {
      players: 2,
      playerName: ""
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$emit("play", {

      })
    },
    handlePlayerNameChange() {

    }
  }
}
</script>
