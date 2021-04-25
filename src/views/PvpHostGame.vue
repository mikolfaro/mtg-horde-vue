<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <Camera :name="playerName" />
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
import { auth } from '@/utils/firebase'
import Camera from '@/components/Camera'

export default {
  name: "PvpHostGame",
  components: {Camera},
  data() {
    return {
      user: {},
      room: null,
      roomId: null
    }
  },
  computed: {
    playerName() {
      return this.user?.displayName
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.user = auth.currentUser

    auth.onAuthStateChanged((user) => {
      this.user = user
    })

    this.loadOtherPlayers()
  },
  methods: {
    loadOtherPlayers() {

    }
  }
}
</script>
