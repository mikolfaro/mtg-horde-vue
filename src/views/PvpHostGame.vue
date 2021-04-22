<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="camera">
            <span class="name">{{ playerName }}</span>
          </div>
        </div>
        <div class="col-4">
          <span v-if="roomId">
            Other players can join using code: {{ this.roomId }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth, db } from '@/utils/firebase'

export default {
  name: "PvpHostGame",
  data() {
    return {
      user: {},
      playerName: null,
      room: null,
      roomId: null
    }
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user
      this.playerName = this.user.displayName

      this.createRoom()
    })
  },
  methods: {
    async createRoom() {
      const data = { ownerId: this.user.uid, createdAt: new Date() }
      console.log(data)

      this.room = db.collection("rooms").doc()
      await this.room.set(data)

      this.roomId = this.room.id
    }
  }
}
</script>
<style lang="sass" scoped>
  .camera
    min-width: 200px
    min-height: 200px
    background: red
</style>
