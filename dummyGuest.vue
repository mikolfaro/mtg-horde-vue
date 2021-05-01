<template>
  <div>
    <h1>PVP {{ roomId }}</h1>
    <div class="videos">
      <video ref="localVideo" autoplay="true" muted="muted"></video>
      <video ref="remoteVideo" autoplay="true"></video>
    </div>
    <div class="buttons-group">
      <button class="button" @click="onOpenUserMedia">Open camera & microphone</button>
      <input v-model="roomId" type="text">
      <button class="button" @click="onJoinRoomClick">Join room</button>
    </div>
  </div>
</template>
<script>
import db from '@/utils/db'
const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
}

export default {
  name: 'PvpGuestGame',
  data() {
    return {
      roomId: null,
      roomRef: null,
      roomSnapshot: null,
      peerConnection: null,
      calleeCandidatesCollection: null,
      callerCandidatesCollection: null,
      remoteStream: null,
    }
  },
  methods: {
    async onOpenUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia(
        {video: true, audio: true});
      this.$refs.localVideo.srcObject = stream;
      this.localStream = stream;
      this.remoteStream = new MediaStream();
      this.$refs.remoteVideo.srcObject = this.remoteStream;
    },
    async onJoinRoomClick() {
      if (!this.roomId) {
        console.log("No room ID set")
        return;
      }

      this.roomRef = db.collection('rooms').doc(`${this.roomId}`);
      this.roomSnapshot = await this.roomRef.get();
      console.log('Got room:', this.roomSnapshot.exists);

      if (!this.roomSnapshot.exists) {
        return
      }

      this.callerCandidatesCollection = this.roomRef.collection('callerCandidates')
      this.calleeCandidatesCollection = this.roomRef.collection('calleeCandidates')

      console.log('Create PeerConnection with configuration: ', configuration);
      this.peerConnection = new RTCPeerConnection(configuration);

      this.peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(`ICE gathering state changed: ${this.peerConnection.iceGatheringState}`)
      })

      this.peerConnection.addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${this.peerConnection.connectionState}`)
      })

      this.peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${this.peerConnection.signalingState}`);
      });

      this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(`ICE connection state change: ${this.peerConnection.iceConnectionState}`);
      });

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      this.peerConnection.addEventListener('icecandidate', event => {
        if (!event.candidate) {
          console.log('Got final candidate!')
          return
        }

        console.log('Got candidate:', event.candidate)
        this.calleeCandidatesCollection.add(event.candidate.toJSON())
      })

      this.peerConnection.addEventListener('track', event => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          this.remoteStream.addTrack(track);
        });
      });

      const offer = this.roomSnapshot.data().offer
      await this.peerConnection.setRemoteDescription(offer)
      const answer = await this.peerConnection.createAnswer()
      await this.peerConnection.setLocalDescription(answer)

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp
        }
      }
      await this.roomRef.update(roomWithAnswer)

      this.roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === "added") {
            let data = change.doc.data()
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
          }
        })
      })
    }
  }
}
</script>
