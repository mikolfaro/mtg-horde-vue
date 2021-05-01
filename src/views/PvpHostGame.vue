<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <Camera :name="playerName" />
        </div>
        <div v-for="(player, index) in otherPlayers" v-bind:key="index" class="col-4">
          <Camera :name="player.name" :otherPlayer="true" />
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
