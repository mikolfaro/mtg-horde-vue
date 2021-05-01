<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
<<<<<<< HEAD
          <div class="camera">
            <span class="name">{{ playerName }}</span>
          </div>
=======
          <Camera :name="playerName" />
        </div>
        <div v-for="(player, index) in otherPlayers" v-bind:key="index" class="col-4">
          <Camera :name="player.name" :otherPlayer="true" />
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
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
<<<<<<< HEAD
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
=======
import Camera from '@/components/Camera'
import pvpGame from '@/mixins/pvpGame'

export default {
  name: "PvpHostGame",
  components: {Camera},
  mixins: [pvpGame],
  data() {
    return {
      user: {},
      room: null,
      roomId: null
    }
  }
}
</script>
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
