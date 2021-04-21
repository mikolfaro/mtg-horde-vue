<template>
  <div class="game-page">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="camera">
            <span class="name">{{ playerName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from '@/utils/firebase'

export default {
  name: "PvpHostGame",
  data() {
    return {
      user: {},
      playerName: null
    }
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user
      this.playerName = user.displayName
    })
  },
}
</script>
<style lang="sass" scoped>
  .camera
    min-width: 200px
    min-height: 200px
    background: red
</style>
