<template>
  <div class="hand" @click="onClick">
    <div class="hand-size">{{cards.length}}</div>
    <button class="button-small" v-on:click.stop @click="onPlusClick">+</button>
    <button class="button-small" v-on:click.stop @click="onMinusClick">-</button>

    <ListModal
      v-if="modalOpen"
      :is-open="true"
      :title="$t('hand.title')"
      :cards="cards"
      :actions="actions"
      @action="onAction"
      @close="onClose"
    />
  </div>
</template>
<script>
  import ListModal from './ListModal'
  export default {
    name: 'Hand',
    components: { ListModal },
    props: {
      cards: { type: Array }
    },
    data() {
      return {
        modalOpen: false,
        actions: {
          play: this.$t("actions.play"),
          discard: this.$t("actions.discard"),
          exile: this.$t("actions.exile"),
        }
      }
    },
    methods: {
      onClick() {
        this.modalOpen = true
      },
      onMinusClick() {
        this.$emit("discard-random")
      },
      onPlusClick() {
        this.$emit("draw")
      },
      onAction(action, card) {
        this.modalOpen = false
        this.$nextTick(function () {
          this.$emit(action, card)
        })
      },
      onClose() {
        this.modalOpen = false
      }
    }
  }
</script>
<style lang="sass">
  .hand-size
    width: 64px
    height: 64px
    text-align: center
    line-height: 64px
    color: white
    font-size: 2em
    background-image: url('~@/assets/hand-mtg.png')

  .hand .button-small
    width: 50%
</style>
