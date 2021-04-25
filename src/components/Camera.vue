<template>
  <div class="camera">
    <span class="name">{{ name }}</span>
  </div>
</template>
<script>
export default {
  name: "Camera",
  data() {
    return {}
  },
  props: {
    name: { type: String }
  }
}
</script>
<style lang="sass" scoped>
  .camera
    min-width: 200px
    min-height: 200px
    background: red
</style>
