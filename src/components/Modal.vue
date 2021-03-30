<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          This is the default title!
        </slot>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot>Body of the modal</slot>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Modal',
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  }
</script>
<style lang="sass">
  @import "~@/styles/modal"
</style>
