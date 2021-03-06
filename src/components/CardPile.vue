<template>
  <div class="card-pile">
    <div class="content" :style="cardPileStyle">
      <div class="content" @click="onPileClick">
        <h2 class="mt-2 button-small">{{ label }}</h2>
        <p class="card-pile-count">{{cards.length}}</p>
      </div>

      <form
          v-if="removeCardLabel"
          class="inline-form"
          id="remove-card-form"
          @submit="handleRemoveCard"
      >
        <div class="form-group">
          <label class="sr-only" for="cards-number">
            {{ $t("cardPile.cardsNumber.label") }}
          </label>
          <input id="cards-number"
                 type="number"
                 v-model="cardsNumber"
                 class="remove-card-input"
                 min="1"
                 @change="handleChange" />
        </div>

        <input type="submit" :value="removeCardLabel" class="button-small remove-card-button" />
      </form>
    </div>

    <ListModal
        v-if="modalOpen"
        :is-open="true"
        :title="label"
        :cards="cards"
        :actions="actions"
        @action="onAction"
        @close="onListClose"
    />
  </div>
</template>
<script>
  import ListModal from './ListModal'
  export default {
    name: 'CardPile',
    components: { ListModal },
    data() {
      return {
        modalOpen: false,
        cardsNumber: 1,
      }
    },
    props: {
      label: { type: String },
      cards: { type: Array },
      background: { type: String },
      removeCardLabel: { type: String },
      actions: { type: Object }
    },
    methods: {
      handleRemoveCard(e) {
        e.preventDefault()
        this.$emit('remove-cards', this.cardsNumber)
      },
      handleChange() {
        console.log("Change")
      },
      onPileClick() {
        this.modalOpen = true
      },
      onListClose() {
        this.modalOpen = false
      },
      onAction(action, card) {
        this.modalOpen = false
        this.$nextTick(function () {
          this.$emit(action, card)
        })
      },
    },
    computed: {
      cardPileStyle() {
        return { backgroundImage: `url('${this.background}')` }
      }
    }
  }
</script>
<style lang="sass">
  @import '~@/styles/global/mixins'

  .card-pile
    width: 100%
    padding-top: 140%
    position: relative

    > .content
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: rgba($color-black, 0.5)
      border: 1px dashed $color-white
      border-radius: 5px
      background-size: contain
      text-align: center
      display: flex
      flex-direction: column

      .content
        flex: 1 0 auto
      form
        flex-shrink: 0
        .button-small
          padding: 5px 0

      .button-small
        display: inline-block

    .card-pile-count
      margin-top: 3em
      color: $color-white
      @include TypoStyle(22px, 1.1, $Bold)

    form
      > div,
      > .button-small
        width: 50%
</style>
