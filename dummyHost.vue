<template>
  <div>
    <h1>PVP {{ roomId }}</h1>
    <div class="videos">
      <video ref="localVideo" autoplay="true" muted="muted"></video>
      <video ref="remoteVideo" autoplay="true"></video>
    </div>
    <div class="buttons-group">
      <button class="button" @click="onOpenUserMedia">Open camera & microphone</button>
      <button class="button" @click="onCreateRoomClick">Create new room</button>
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
    name: 'PvpHostGame',
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
    async mounted() {
      this.roomRef = await db.collection('rooms').doc()
      this.roomSnapshot = await this.roomRef.get();
      this.callerCandidatesCollection = this.roomRef.collection('callerCandidates')
      this.calleeCandidatesCollection = this.roomRef.collection('calleeCandidates')
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
      async onCreateRoomClick() {
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
          this.onIceCandidate(event)
        })

        const offer = await this.peerConnection.createOffer()
        await this.peerConnection.setLocalDescription(offer)

        const roomWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp
          }
        }

        this.roomRef.set(roomWithOffer)
        this.roomId = this.roomRef.id


        this.roomRef.onSnapshot(async (snapshot) => {
          console.log('Got updated room:', snapshot.data())
          const data = snapshot.data()
          if (!this.peerConnection.currentRemoteDescription && data.answer) {
            console.log('Set remote description', data.answer)
            const answer = new RTCSessionDescription(data.answer)
            await this.peerConnection.setRemoteDescription(answer)
          }
        })

        this.peerConnection.addEventListener('track', (event) => {
          this.onTrack(event)
        })

        this.calleeCandidatesCollection.onSnapshot((snapshot) => {
          console.log("calleeCandidatesCollection", snapshot.forEach)
          snapshot.docChanges().forEach(async change => {
            if (change.type === "added") {
              let data = change.doc.data()
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
            }
          })
        })
      },
      onIceCandidate(event) {
        if (!event.candidate) {
          console.log('Got final candidate!')
          return
        }

        console.log('Got candidate:', event.candidate)
        this.callerCandidatesCollection.add(event.candidate.toJSON())
      },
      onTrack(event) {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          this.remoteStream.addTrack(track);
        });
      }
    }
  }
</script>
