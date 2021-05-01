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
import { auth, db } from '@/utils/firebase'

export default {
  name: "PvpHostGameForm",
  data() {
    return {
      players: 2,
      playerName: ""
    }
  },
  mounted () {
    this.playerName = auth.currentUser ? auth.currentUser.displayName : null
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const roomId = await this.createRoom()
      this.$emit("play", roomId)
    },
    async handlePlayerNameChange() {
      await auth.currentUser.updateProfile({
        displayName: this.playerName,
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        console.log(error)
      });
    },
    async createRoom() {
      const data = { ownerId: auth.currentUser.uid, createdAt: new Date() }

      const room = db.collection("rooms").doc()
      await room.set(data)

      console.log("Created new room", room.id)

      return room.id
    }
  }
}
</script>
