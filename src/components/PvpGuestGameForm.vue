<template>
  <form v-on:submit="handleSubmit">
    <div class="mt-3 form-group">
      <label for="playerName">{{ $t("gameForm.playerName.label") }}</label>
      <input class="form-control" id="playerName" name="playerName" type="text"
             v-model="playerName" @change="handlePlayerNameChange"
      />
    </div>
    <div class="mt-3 form-group">
      <label for="roomId">{{ $t("gameForm.roomId.label") }}</label>
      <input class="form-control" id="roomId" name="roomId" type="text"
             v-model="roomId" @change="handleRoomIdChange" />
    </div>
    <div class="mt-3">
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
  name: "PvpGuestGameForm",
  data() {
    return {
      playerName: "",
      roomId: "",
      roomExists: false
    }
  },
  mounted () {
    this.playerName = auth.currentUser.displayName
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.roomExists) {
        this.$emit("play", this.roomId)
      }
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
    async handleRoomIdChange() {
      this.roomExists = false
      const room = db.collection("rooms").doc(this.roomId)
      this.roomExists = (await room.get()).exists
    }
  }
}
</script>
