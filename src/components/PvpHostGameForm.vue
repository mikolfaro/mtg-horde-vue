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
<<<<<<< HEAD
import { auth } from '@/utils/firebase'
=======
import { auth, db } from '@/utils/firebase'
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a

export default {
  name: "PvpHostGameForm",
  data() {
    return {
      players: 2,
      playerName: ""
    }
  },
  mounted () {
<<<<<<< HEAD
    this.playerName = auth.currentUser.displayName
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$emit("play", {

      })
=======
    this.playerName = auth.currentUser ? auth.currentUser.displayName : null
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const roomId = await this.createRoom()
      this.$emit("play", roomId)
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
    },
    async handlePlayerNameChange() {
      await auth.currentUser.updateProfile({
        displayName: this.playerName,
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        console.log(error)
      });
<<<<<<< HEAD
=======
    },
    async createRoom() {
      const data = { ownerId: auth.currentUser.uid, createdAt: new Date() }
      console.log(data)

      const room = db.collection("rooms").doc()
      await room.set(data)

      return room.id
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
    }
  }
}
</script>
