// const configuration = {
//   iceServers: [{
//     urls: [
//       'stun:stun1.l.google.com:19302',
//       'stun:stun2.l.google.com:19302',
//     ]
//   }],
//   iceCandidatePoolSize: 10
// }

export default {
  data() {
    return { localStream: null }
  },
  methods: {
    async openUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.localStream = stream
    }
  }
}
