<template>
  <div class="camera" :class="{ 'other-player': otherPlayer }">
    <span class="name">{{ name }}</span>
  </div>
</template>
<script>
export default {
  name: "Displayv",
  data() {
    return {}
  },
  props: {
    name: { type: String },
    otherPlayer: { type: Boolean }
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
</style>
