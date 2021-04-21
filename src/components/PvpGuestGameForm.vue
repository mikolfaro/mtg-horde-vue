<template>
  <form v-on:submit="handleSubmit">
    <div class="mt-3">
      <input
          class="button button-primary"
          type="submit"
          :value="$t('gameForm.submit')"
      />
    </div>
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
