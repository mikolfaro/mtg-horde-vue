<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <Display :name="user ? user.uid : null" :stream="this.localStream" />
        </div>
        <div v-for="(player, index) in otherPlayers" v-bind:key="index" class="col-4">
          <Display :name="index" :otherPlayer="true" />
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
import Display from '@/components/Display'
import pvpGame from '@/mixins/pvpGame'
import audioVideo from '@/mixins/audioVideo'

export default {
  name: "PvpHostGame",
  components: {Display},
  mixins: [pvpGame, audioVideo],
  data() {
    return {
      user: {},
      room: null,
      roomId: null
    }
  },
  mounted() {
    this.loadRoom()
    this.openUserMedia()
  },
  methods: {
    otherPlayerJoined(id, data) {
      console.log("other player joined", id, data)
      this.createStreamOffer(this.room, this.user.uid, id)
    }
  }
}
</script>
