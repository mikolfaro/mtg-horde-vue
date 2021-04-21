<template>
  <form v-on:submit="handleSubmit">
    <input
        class="button button-primary"
        type="submit"
        :value="$t('gameForm.submit')"
    />
  </form>
</template>
<script>
export default {
  name: "PvpGuestGameForm",
  data() {
    return {}
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$emit("play", {

      })
    }
  }
}
</script>
