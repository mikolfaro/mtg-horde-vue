<template>
  <div v-if="isOpen" class="modal-backdrop" v-on:click.stop @click="close">
    <div class="modal" v-on:click.stop>
      <header class="modal-header">
        <slot name="header"></slot>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body"></slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
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
      dummy(e) {
        console.log("Click", e.target)
      },
      close() {
        this.$emit('close');
      },
    },
  }
</script>
<style lang="sass">
  .modal-backdrop
    z-index: 99
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: rgba($color-black, 0.3)
    display: flex
    justify-content: center
    align-items: center

  .modal
    width: 80%
    max-width: 900px

    text-align: center
    border: 1px solid black
    border-radius: 5px
    color: white
    background-color: rgba($color-black, 0.7)
    display: flex
    justify-content: center
    flex-direction: column
    overflow-x: auto
    display: flex
    flex-direction: column

  .modal-header,
  .modal-footer
    padding: 15px
    display: flex

  .modal-header
    position: relative
    border-bottom: 1px solid $color-black
    color: $color-white
    justify-content: space-between

  .modal-footer
    border-top: 1px solid $color-black
    flex-direction: column
    justify-content: flex-end

  .modal-body
    position: relative
    padding: 20px 10px

  .btn-close
    position: absolute
    top: 0
    right: 0
    border: none
    font-size: 20px
    padding: 10px
    cursor: pointer
    font-weight: bold
    color: $color-white
    background: transparent
</style>
