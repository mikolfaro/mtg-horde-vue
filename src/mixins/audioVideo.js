import { db } from '../utils/firebase'

const configuration = {
  iceServers: [{
    urls: [
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
    ]
  }],
  iceCandidatePoolSize: 10
}

export default {
  data() {
    return { 
      localStream: null,
      peerConnections: {},
      remoteStreams: {}
     }
  },
  methods: {
    listenForOffers(roomId, userId) {
      console.log("Listening offers in room", roomId, "to user", userId)
      db.collection(`rooms/${roomId}/stream-offers`).where("forId", "==", userId)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data()
            this.acceptStreamOffer(doc.id, roomId, userId, data.fromId, data.offerSdp)
          })
        })
    },
    async openUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.localStream = stream
    },
    async createStreamOffer(room, userId, otherPlayerId = null) {
      console.log("creating offer for", otherPlayerId)

      const connection = this.createConnection(otherPlayerId)
      this.peerConnections[otherPlayerId] = connection

      connection.addEventListener('icecandidate', event => {
        this.onCallerIceCandidate(event, otherPlayerId)
      })

      const offer = await connection.createOffer()
      await connection.setLocalDescription(offer)

      console.log(userId, 'create offer for', otherPlayerId)
      const offerDoc = db.collection(`rooms/${room.id}/stream-offers`).doc(`${userId}-${otherPlayerId}`)
      const offerData = { forId: otherPlayerId, byId: userId, offerSdp: offer.sdp }
      await offerDoc.set(offerData)

      console.log("Created offer", offerData)
    },
    async acceptStreamOffer(roomId, userId, otherPlayerId, sdp) {
      let connection = this.peerConnections[otherPlayerId]
      if (!connection) {
        connection = this.createConnection(otherPlayerId)
        this.peerConnections[otherPlayerId] = connection
      }

      connection.addEventListener('icecandidate', event => {
        this.onCalleeIceCandidate(event, otherPlayerId)
      })

      connection.addEventListener('track', event => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          this.remoteStreams[otherPlayerId].addTrack(track);
        });
      });

      const offer = { type: "offer", sdp: sdp }
      await connection.setRemoteDescription(offer)
      const answer = await connection.createAnswer()
      await connection.setLocalDescription(answer)

      console.log(userId, 'create answer for', otherPlayerId)
      const offerDoc = db.collection(`rooms/${roomId}/stream-offers`).doc(`${otherPlayerId}-${userId}`)
      const answerData = { answerSdp: answer.sdp }
      await offerDoc.set(answerData, {merge: true})

      console.log(userId, 'created answer for', otherPlayerId)
    },
    onCallerIceCandidate(event) {
      if (!event.candidate) {
        console.log('Got final candidate!')
        return
      }

      console.log('Got candidate:', event.candidate)
      this.callerCandidatesCollection.add(event.candidate.toJSON())
    },
    onCalleeIceCandidate(event) {
      if (!event.candidate) {
        console.log('Got final candidate!')
        return
      }

      console.log('Got candidate:', event.candidate)
      this.calleeCandatesCollection.add(event.candidate.toJSON())
    },
    onTrack(event) {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        this.remoteStream.addTrack(track);
      });
    },
    createConnection() {
      const connection = new RTCPeerConnection(configuration)

      this.localStream.getTracks().forEach(track => {
        connection.addTrack(track, this.localStream)
      });

      try {
        this.localStream.getTracks().forEach(track => {
          connection.addTrack(track, this.localStream);
        });
      } catch (e) {
        console.log(e)
      }

      return connection
    }
  }
}
