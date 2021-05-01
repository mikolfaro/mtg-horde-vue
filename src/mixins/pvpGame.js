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
  unmounted() {
    this.leaveRoom()
  },
  methods: {
    async loadRoom() {
      this.roomId = this.$route.params.roomId
      this.user = auth.currentUser

      this.room = await db.collection(`rooms`).doc(this.roomId).get()

      this.playersCollection = db.collection(`rooms/${this.roomId}/players`)

      if (this.user) {
        this.joinRoom()
      }

      auth.onAuthStateChanged((user) => {
        this.user = user
        this.joinRoom()
      })

      this.loadOtherPlayers()

      console.log("Joined room", this.roomId)
      this.playersCollection.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc
          if (change.type === "added") {
            if (doc.id !== this.user.uid) {
              this.$set(this.players, doc.id, doc.data())
            }
          }

          if (doc.offers && doc.offers[0]) {
            console.log("Received stream offer")
            this.receivedStreamOffer(doc.id, doc.offers)
          }
        })
      })
    },
    async loadOtherPlayers() {
      const playerDocs = await this.playersCollection.get()

      let players = {}
      playerDocs.forEach((player) => {
        console.log("Received an update on players collection", player.id)
        if (this.user.uid !== player.id) {
          const doc = player.data()
          players[player.id] = doc
          this.$set(this.players, player.id, doc)
          this.otherPlayerJoined(player.id, doc)
        }
      })

      this.players = players
    },
    async joinRoom() {
      const doc = this.playersCollection.doc(this.user.uid)
      await doc.set({ name: this.playerName })
    },
    async leaveRoom() {
      const doc = this.playersCollection.doc(this.user.uid)
      await doc.delete()
    }
  }
}
