<template>
  <div class="camera" :class="{ 'other-player': otherPlayer }">
    <span class="name">{{ name }}</span>

    <video ref="video" autoplay="true" :muted="muted"></video>
  </div>
</template>
<script>
export default {
  name: "Display",
  data() {
    return {}
  },
  props: {
    name: { type: String },
    otherPlayer: { type: Boolean },
    stream: { type: MediaStream }
  },
  mounted() {
    if (this.stream) {
      this.$refs.video.srcObject = this.stream
    }
  },
  computed: {
    muted() {
      return this.otherPlayer ? null : "muted"
    }
  },
  watch: {
    stream: function (newStream) {
      if (newStream) {
        this.$refs.video.srcObject = newStream
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .camera
    min-width: 200px
    min-height: 200px
    background: red

    &.other-player
      background: yellow

    video
      width: 100%
</style>
