import { auth, db } from '@/utils/firebase'

export default {
  data() {
    return {
      playersCollection: null,
      players: {}
    }
  },
  computed: {
    playerName() {
      return this.user?.displayName
    },
    otherPlayers() {
      return this.players
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.user = auth.currentUser

    this.playersCollection = db.collection(`rooms/${this.roomId}/players`)

    if (this.user) {
      this.joinRoom()
    }

    auth.onAuthStateChanged((user) => {
      this.user = user
      this.joinRoom()
    })

    this.loadOtherPlayers()
  },
  methods: {
    async loadOtherPlayers() {
      const playerDocs = await this.playersCollection.get()

      let players = {}
      playerDocs.forEach((player) => {
        players[player.id] = player.data()
      })

      delete players[this.user.uid]

      this.players = players
    },
    async joinRoom() {
      const doc = this.playersCollection.doc(this.user.uid)
      await doc.set({ name: this.playerName })
    }
  }
}
