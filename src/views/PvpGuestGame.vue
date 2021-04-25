<template>
    <div class="game-page">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <Camera :name="user.displayName" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { auth } from '@/utils/firebase'
import Camera from '@/components/Camera'

export default {
  name: "PvpGuestGame",
  components: {Camera},
  data() {
    return {
      user: {},
      room: null,
      roomId: null,
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.user = auth.currentUser

    auth.onAuthStateChanged((user) => {
      this.user = user
    })
  }
}
</script>
